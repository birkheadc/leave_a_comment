export type CreateCommentRequest = {
  site: string,
  name: string,
  body: string,
  [key: string]: string
}

export const DEFAULT_CREATE_COMMENT_REQUEST: CreateCommentRequest = {
  site: "",
  name: "",
  body: ""
}