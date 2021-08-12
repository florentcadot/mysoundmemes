export type UpdateBoardRequestDto = {
  id: string
  title?: string
  color?: string
  file?: File
}

export type UpdateBoardResponseDto = {
  id: string
  userId: string
  title: string
  color: string
  avatar: string
}
