export namespace DeviceGroupMembershipApplicationEvent {
  export namespace DeviceGroupMembershipCreated {
    export const key =
      'deviceGroupMembership.application.deviceGroupMembership.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
