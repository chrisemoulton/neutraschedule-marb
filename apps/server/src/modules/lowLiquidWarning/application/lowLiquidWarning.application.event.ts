export namespace LowLiquidWarningApplicationEvent {
  export namespace LowLiquidWarningCreated {
    export const key = 'lowLiquidWarning.application.lowLiquidWarning.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
