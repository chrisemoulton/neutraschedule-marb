export namespace ScheduleApplicationEvent {
  export namespace ScheduleCreated {
    export const key = 'schedule.application.schedule.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
