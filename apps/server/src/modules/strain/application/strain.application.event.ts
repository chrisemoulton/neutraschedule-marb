export namespace StrainApplicationEvent {
  export namespace StrainCreated {
    export const key = 'strain.application.strain.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
