import { Schedule } from '../schedule'

export class Room {
  id: string

  name?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  schedules?: Schedule[]
}
