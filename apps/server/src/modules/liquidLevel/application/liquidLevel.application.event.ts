export namespace LiquidLevelApplicationEvent {
  export namespace LiquidLevelCreated {
    export const key = 'liquidLevel.application.liquidLevel.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
