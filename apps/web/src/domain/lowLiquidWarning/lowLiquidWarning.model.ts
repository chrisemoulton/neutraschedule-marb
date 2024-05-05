import { LiquidLevel } from '../liquidLevel'

export class LowLiquidWarning {
  id: string

  warningTime?: string

  acknowledged?: boolean

  levelId: string

  level?: LiquidLevel

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
