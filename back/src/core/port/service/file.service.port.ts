import { Readable } from 'stream';
import { PrivateFileUrl } from '../../domain/private-file-url';
import { EntityFile } from '../../domain/entity-file';

export interface FileService {
  uploadPrivateFile(props: { dataBuffer: Buffer, dataMimetype: string }): Promise<string>
  getPrivateFile(fileKey: string): Promise<Readable>
  deletePrivateFile(fileKey: string): Promise<void>
  generatePresignedUrl(fileKey: string): Promise<string>
  getPrivateFilesUrl(fileKeyList: string[]): Promise<PrivateFileUrl[]>
  uploadPublicFile(props: { dataBuffer: Buffer, dataMimetype: string }): Promise<EntityFile>
  deletePublicFile(fileKey: string): Promise<void>
  getPublicFileList(): Promise<{key: string}[]>
  getPrivateFileList(): Promise<{key: string}[]>
}

