import { AuthConfig } from "src/auth/auth.config"
import { CommentsConfig } from "../comments/comments.config"

type Configuration = {
  auth: AuthConfig,
  comments: CommentsConfig
}

export default (): Configuration => ({
  auth: {
    region: 'ap-southeast-2',
    secretId: 'Secrets',
    secretName: 'LeaveACommentJwtKey'
  },
  comments: {
    region: "ap-southeast-2",
    tableName: "LeaveACommentComments"
  }
})