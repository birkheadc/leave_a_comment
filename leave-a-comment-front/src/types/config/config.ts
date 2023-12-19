export type Config = {
  api: ApiConfig
}

export type ApiConfig = {
  general: {
    timeout: number,
    thisSite: string
  },
  authentication: {
    url: string
  },
  comments: {
    url: string
  }
}