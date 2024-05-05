export namespace SessionNutrientApplicationEvent {
  export namespace SessionNutrientCreated {
    export const key = 'sessionNutrient.application.sessionNutrient.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
