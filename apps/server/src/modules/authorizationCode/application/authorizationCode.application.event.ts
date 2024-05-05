export namespace AuthorizationCodeApplicationEvent {
  export namespace AuthorizationCodeCreated {
    export const key = 'authorizationCode.application.authorizationCode.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
