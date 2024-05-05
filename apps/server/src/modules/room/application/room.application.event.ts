export namespace RoomApplicationEvent {
  export namespace RoomCreated {
    export const key = 'room.application.room.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
