export type CreateBoardSoundResponseDto = {
  id: string
  boardId: string
  userId: string
  title: string
  file: string
}

export type CreateBoardSoundRequestDto = {
  boardId: string
  title: string
  file?: File
}
