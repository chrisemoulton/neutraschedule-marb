import { User } from '../user'

import { DeviceGroupMembership } from '../deviceGroupMembership'

export class DeviceGroup {
  id: string

  name: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  deviceGroupMembershipsAsGroup?: DeviceGroupMembership[]
}
