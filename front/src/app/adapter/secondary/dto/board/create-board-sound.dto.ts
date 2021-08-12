export interface CreateBoardSoundResponseDto {
  id: string
  boardId: string
  userId: string
  title: string
  file: string
}

export interface CreateBoardSoundRequestDto {
  boardId: string
  title: string
  file?: File
}
