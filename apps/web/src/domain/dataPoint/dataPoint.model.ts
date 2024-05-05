import { Session } from '../session'

export class DataPoint {
  id: string

  type?: string

  value?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  sessionId?: string

  session?: Session
}
