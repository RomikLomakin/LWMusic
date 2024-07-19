export type FileBase64 = {
  base64: string
  fileList: FileList
}

export type Category = {
  id: number
  title: string
}

export type RoomType = {
  categories: Category[]
  id: string
  image: string
  name: string
}
