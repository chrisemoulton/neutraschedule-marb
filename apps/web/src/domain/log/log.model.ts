import { Device } from '../device'

import { User } from '../user'

export class Log {
  id: string

  event?: string

  timestamp?: string

  severity?: string

  category?: string

  data?: any

  sourceIp?: string

  deviceId: string

  device?: Device

  userId?: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
