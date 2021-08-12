export type GetBoardSoundListRequestDto = {
  boardId: string
}

export type GetBoardSoundListResponseDto = {
  id: string
  boardId: string
  userId: string
  title: string
  file: {
    key: string
    duration: number
    url: string
  }
}
