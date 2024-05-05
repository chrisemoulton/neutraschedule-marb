export namespace SessionApplicationEvent {
  export namespace SessionCreated {
    export const key = 'session.application.session.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
