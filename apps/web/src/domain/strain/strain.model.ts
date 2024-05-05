import { Schedule } from '../schedule'

export class Strain {
  id: string

  name?: string

  optimalTemperature?: number

  optimalHumidity?: number

  optimalCo2level?: number

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  schedules?: Schedule[]
}
