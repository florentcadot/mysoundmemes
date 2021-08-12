export type UpdateBoardSoundRequestDto = {
  id: string
  boardId?: string
  title?: string
}

export type UpdateBoardSoundResponseDto = {
  id: string
  boardId: string
  userId: string
  title: string
  file: string
}
