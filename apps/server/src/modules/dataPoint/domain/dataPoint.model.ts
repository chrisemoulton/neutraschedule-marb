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
export class DataPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  type?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  value?: number

  @Column({ nullable: true })
  sessionId?: string

  @ManyToOne(() => Session, parent => parent.dataPoints)
  @JoinColumn({ name: 'sessionId' })
  session?: Session

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
