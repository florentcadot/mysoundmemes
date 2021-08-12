
export interface UpdateBoardSoundRequestDto {
  id: string
  boardId?: string
  title?: string
}

export interface UpdateBoardSoundResponseDto {
  id: string
  boardId: string
  userId: string
  title: string
  file:  string
}
