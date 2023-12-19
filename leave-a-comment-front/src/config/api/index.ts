import { ApiConfig } from "../../types/config/config";

const apiConfig: ApiConfig = {
  general: {
    timeout: 8000,
    thisSite: process.env.THIS_SITE || "not_set"
  },
  authentication: {
    url: process.env.AUTHENTICATION_URL || "not_set"
  },
  comments: {
    url: process.env.COMMENTS_URL || "not_set"
  }
}

export default apiConfig;