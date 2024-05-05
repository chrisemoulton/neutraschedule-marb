export namespace DataPointApplicationEvent {
  export namespace DataPointCreated {
    export const key = 'dataPoint.application.dataPoint.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
