import { Device } from '../device'

export class ShotSchedule {
  id: string

  scheduledTime?: string

  frequency?: string

  enabled?: boolean

  deviceId: string

  device?: Device

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
