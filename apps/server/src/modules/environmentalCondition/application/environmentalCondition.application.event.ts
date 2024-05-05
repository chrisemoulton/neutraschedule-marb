export namespace EnvironmentalConditionApplicationEvent {
  export namespace EnvironmentalConditionCreated {
    export const key =
      'environmentalCondition.application.environmentalCondition.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
