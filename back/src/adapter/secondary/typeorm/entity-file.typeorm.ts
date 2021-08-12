import { Column } from 'typeorm';

export class EntityFileTypeorm {

  @Column()
  key: string

  @Column()
  url?: string

  constructor(key: string, url: string) {
    this.key = key
    this.url = url
  }

}
