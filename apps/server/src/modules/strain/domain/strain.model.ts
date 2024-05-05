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

@Entity()
export class Strain {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  optimalTemperature?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  optimalHumidity?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  optimalCo2level?: number

  @OneToMany(() => Schedule, child => child.strain)
  schedules?: Schedule[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
