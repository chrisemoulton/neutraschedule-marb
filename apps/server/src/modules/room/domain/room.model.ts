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
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @OneToMany(() => Schedule, child => child.room)
  schedules?: Schedule[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
