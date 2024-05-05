export namespace ShotScheduleApplicationEvent {
  export namespace ShotScheduleCreated {
    export const key = 'shotSchedule.application.shotSchedule.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
