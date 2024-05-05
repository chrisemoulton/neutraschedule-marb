export namespace NutrientApplicationEvent {
  export namespace NutrientCreated {
    export const key = 'nutrient.application.nutrient.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
