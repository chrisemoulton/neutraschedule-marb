import { Device } from '../device'

export class Shot {
  id: string

  shotTime?: string

  shotType?: string

  outcome?: string

  details?: any

  deviceId: string

  device?: Device

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
