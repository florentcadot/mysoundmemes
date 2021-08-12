
export interface GetBoardSoundListRequestDto {
  boardId: string
}

export interface GetBoardSoundListResponseDto {
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
