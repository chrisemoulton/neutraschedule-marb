import { Session } from '../session'

import { Nutrient } from '../nutrient'

export class SessionNutrient {
  id: string

  quantityUsed?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  sessionId?: string

  session?: Session

  nutrientId?: string

  nutrient?: Nutrient
}
