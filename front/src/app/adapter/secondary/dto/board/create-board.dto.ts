export interface CreateBoardRequestDto {
  title: string
  color: string
  file?: File
}

export interface CreateBoardResponseDto {
  id: string
  userId: string
  title: string
  color: string
  avatar?: string
}
