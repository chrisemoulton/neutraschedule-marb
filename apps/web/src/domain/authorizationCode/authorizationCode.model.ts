import { User } from '../user'

export class AuthorizationCode {
  id: string

  code: string

  expiresAt?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
