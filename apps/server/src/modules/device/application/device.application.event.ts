export namespace DeviceApplicationEvent {
  export namespace DeviceCreated {
    export const key = 'device.application.device.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
