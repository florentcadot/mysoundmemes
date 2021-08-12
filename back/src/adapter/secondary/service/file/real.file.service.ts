import { FileService} from '../../../../core/port/service/file.service.port';
import { S3 } from 'aws-sdk';
import { UniqueIdService } from '../../../../core/port/service/unique-id.service.port';
import { AWS_PRIVATE_BUCKET_NAME, AWS_PUBLIC_BUCKET_NAME } from '../../../../../config/bucket.config';
import { Readable } from 'stream';
import { PrivateFileUrl } from '../../../../core/domain/private-file-url';


export class RealFileService implements FileService {

  constructor(private uniqueIdService: UniqueIdService) {}

  async uploadPrivateFile(props: { dataBuffer: Buffer , dataMimetype; string}): Promise<string> {
    const s3 = new S3()

    const uploadResult = await s3.upload({
      Bucket: AWS_PRIVATE_BUCKET_NAME,
      Body: props.dataBuffer,
      Key: `${this.uniqueIdService.generate()}`,
      ContentType: props.dataMimetype,
    }).promise()

    return uploadResult.Key
  }

  public async getPrivateFile(fileKey: string): Promise<Readable> {
    const s3 = new S3()
    const stream = await s3.getObject({
      Bucket: AWS_PRIVATE_BUCKET_NAME,
      Key: fileKey
    })
      .createReadStream();

    return stream
  }

  public async generatePresignedUrl(fileKey: string) {
    const s3 = new S3()
    return s3.getSignedUrlPromise('getObject', {
      Bucket: AWS_PRIVATE_BUCKET_NAME,
      Key: fileKey
    })
  }

  public async getPrivateFilesUrl(fileKeyList: string[]): Promise<PrivateFileUrl[]> {
    return Promise.all(
      fileKeyList.map(async (fileKey) =>{
        const url = await this.generatePresignedUrl(fileKey)
        return {
          key: fileKey,
          url
        }
      })
   )
  }

  async deletePrivateFile(fileKey: string): Promise<void> {
    const s3 = new S3()
    await s3.deleteObject({
      Bucket: AWS_PRIVATE_BUCKET_NAME,
      Key: fileKey,
    }).promise();
  }

  async uploadPublicFile(props: { dataBuffer: Buffer, dataMimetype: string }): Promise<{key: string, url: string}> {
    const s3 = new S3()
    const uploadResult = await s3.upload({
      Bucket: AWS_PUBLIC_BUCKET_NAME,
      Body: props.dataBuffer,
      Key: `${this.uniqueIdService.generate()}`,
      ContentType: props.dataMimetype,
    }).promise()

    return { key: uploadResult.Key, url: uploadResult.Location }
  }

  async deletePublicFile(fileKey: string): Promise<void> {
    const s3 = new S3()
    await s3.deleteObject({
      Bucket: AWS_PUBLIC_BUCKET_NAME,
      Key: fileKey,
    }).promise();
  }

  async getPublicFileList(): Promise<{key: string}[]> {
    const s3 = new S3()
    const result = await s3.listObjectsV2({
        Bucket: AWS_PUBLIC_BUCKET_NAME,
    }).promise()
     return result.Contents.map(file => ({key: file.Key}))
  }

  async getPrivateFileList(): Promise<{key: string}[]> {
    const s3 = new S3()
    const result = await s3.listObjectsV2({
        Bucket: AWS_PRIVATE_BUCKET_NAME,
    }).promise()
    return result.Contents.map(file => ({key: file.Key}))
  }

}
