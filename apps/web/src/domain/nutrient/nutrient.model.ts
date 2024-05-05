import { SessionNutrient } from '../sessionNutrient'

export class Nutrient {
  id: string

  type?: string

  concentration?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  sessionNutrients?: SessionNutrient[]
}
