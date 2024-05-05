import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Schedule } from '../../../modules/schedule/domain'

import { SessionNutrient } from '../../../modules/sessionNutrient/domain'

import { EnvironmentalCondition } from '../../../modules/environmentalCondition/domain'

import { DataPoint } from '../../../modules/dataPoint/domain'

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  actualStartTime?: string

  @Column({ nullable: true })
  actualEndTime?: string

  @Column({ nullable: true })
  scheduleId?: string

  @ManyToOne(() => Schedule, parent => parent.sessions)
  @JoinColumn({ name: 'scheduleId' })
  schedule?: Schedule

  @OneToMany(() => SessionNutrient, child => child.session)
  sessionNutrients?: SessionNutrient[]

  @OneToMany(() => EnvironmentalCondition, child => child.session)
  environmentalConditions?: EnvironmentalCondition[]

  @OneToMany(() => DataPoint, child => child.session)
  dataPoints?: DataPoint[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
