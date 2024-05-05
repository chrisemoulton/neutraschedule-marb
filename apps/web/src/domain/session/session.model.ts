import { Schedule } from '../schedule'

import { SessionNutrient } from '../sessionNutrient'

import { EnvironmentalCondition } from '../environmentalCondition'

import { DataPoint } from '../dataPoint'

export class Session {
  id: string

  actualStartTime?: string

  actualEndTime?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  scheduleId?: string

  schedule?: Schedule

  sessionNutrients?: SessionNutrient[]

  environmentalConditions?: EnvironmentalCondition[]

  dataPoints?: DataPoint[]
}
