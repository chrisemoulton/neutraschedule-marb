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

import { Session } from '../../../modules/session/domain'

@Entity()
export class EnvironmentalCondition {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  temperature?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  humidity?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  co2level?: number

  @Column({ nullable: true })
  sessionId?: string

  @ManyToOne(() => Session, parent => parent.environmentalConditions)
  @JoinColumn({ name: 'sessionId' })
  session?: Session

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
