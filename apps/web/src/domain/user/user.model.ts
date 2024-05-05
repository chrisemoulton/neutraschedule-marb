import { Notification } from '../notification'

import { Device } from '../device'

import { DeviceGroup } from '../deviceGroup'

import { Log } from '../log'

import { AuthorizationCode } from '../authorizationCode'

import { Schedule } from '../schedule'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  devices?: Device[]

  deviceGroups?: DeviceGroup[]

  logs?: Log[]

  authorizationCodes?: AuthorizationCode[]

  schedules?: Schedule[]
}
