import { User } from '../user'

import { Room } from '../room'

import { Strain } from '../strain'

import { Session } from '../session'

export class Schedule {
  id: string

  startTime?: string

  endTime?: string

  frequency?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  userId?: string

  user?: User

  roomId?: string

  room?: Room

  strainId?: string

  strain?: Strain

  sessions?: Session[]
}
