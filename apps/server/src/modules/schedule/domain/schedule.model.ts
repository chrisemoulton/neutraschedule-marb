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

import { User } from '../../../modules/user/domain'

import { Room } from '../../../modules/room/domain'

import { Strain } from '../../../modules/strain/domain'

import { Session } from '../../../modules/session/domain'

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  startTime?: string

  @Column({ nullable: true })
  endTime?: string

  @Column({ nullable: true })
  frequency?: string

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.schedules)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  roomId?: string

  @ManyToOne(() => Room, parent => parent.schedules)
  @JoinColumn({ name: 'roomId' })
  room?: Room

  @Column({ nullable: true })
  strainId?: string

  @ManyToOne(() => Strain, parent => parent.schedules)
  @JoinColumn({ name: 'strainId' })
  strain?: Strain

  @OneToMany(() => Session, child => child.schedule)
  sessions?: Session[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
