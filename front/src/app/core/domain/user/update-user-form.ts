export interface UpdateUserForm {
  firstname?: string
  lastname?: string
  email?: string
  password?: {
    old?: string
    new?: string
  }
  file?: null | File
}
