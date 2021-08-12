export type CreateBoardRequestDto = {
  title: string
  color: string
  file?: File
}

export type CreateBoardResponseDto = {
  id: string
  userId: string
  title: string
  color: string
  avatar?: string
}
