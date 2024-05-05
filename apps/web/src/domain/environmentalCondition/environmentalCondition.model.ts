import { Session } from '../session'

export class EnvironmentalCondition {
  id: string

  temperature?: number

  humidity?: number

  co2level?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  sessionId?: string

  session?: Session
}
