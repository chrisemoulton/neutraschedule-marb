export namespace LogApplicationEvent {
  export namespace LogCreated {
    export const key = 'log.application.log.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
