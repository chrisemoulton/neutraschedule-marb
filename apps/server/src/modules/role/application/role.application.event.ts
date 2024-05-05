export namespace RoleApplicationEvent {
  export namespace RoleCreated {
    export const key = 'role.application.role.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
