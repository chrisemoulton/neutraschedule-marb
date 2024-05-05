export namespace DeviceGroupApplicationEvent {
  export namespace DeviceGroupCreated {
    export const key = 'deviceGroup.application.deviceGroup.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
