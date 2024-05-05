import { DeviceGroup } from '../deviceGroup'

import { Device } from '../device'

export class DeviceGroupMembership {
  id: string

  groupId: string

  group?: DeviceGroup

  deviceId: string

  device?: Device

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
