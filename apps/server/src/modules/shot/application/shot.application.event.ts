export namespace ShotApplicationEvent {
  export namespace ShotCreated {
    export const key = 'shot.application.shot.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
