import { User } from '../user'

import { DeviceGroupMembership } from '../deviceGroupMembership'

import { Notification } from '../notification'

import { Log } from '../log'

import { Shot } from '../shot'

import { ShotSchedule } from '../shotSchedule'

import { LiquidLevel } from '../liquidLevel'

export class Device {
  id: string

  serialNumber: string

  description?: string

  deviceType?: string

  firmwareVersion?: string

  status?: string

  lastCheck?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  deviceGroupMemberships?: DeviceGroupMembership[]

  notifications?: Notification[]

  logs?: Log[]

  shots?: Shot[]

  shotSchedules?: ShotSchedule[]

  liquidLevels?: LiquidLevel[]
}
