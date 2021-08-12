export interface UpdateBoardRequestDto {
  id: string
  title?: string
  color?: string
  file?: File
}

export interface UpdateBoardResponseDto {
  id: string
  userId: string
  title: string
  color: string
  avatar: string
}
