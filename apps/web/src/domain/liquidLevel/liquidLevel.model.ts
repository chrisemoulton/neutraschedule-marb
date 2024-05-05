import { Device } from '../device'

import { LowLiquidWarning } from '../lowLiquidWarning'

export class LiquidLevel {
  id: string

  recordedTime?: string

  liquidLevel?: number

  lowLevelThreshold?: number

  deviceId: string

  device?: Device

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  lowLiquidWarningsAsLevel?: LowLiquidWarning[]
}
