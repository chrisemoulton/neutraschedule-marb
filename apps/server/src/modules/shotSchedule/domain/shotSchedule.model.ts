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

import { Device } from '../../../modules/device/domain'

@Entity()
export class ShotSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  scheduledTime?: string

  @Column({ nullable: true })
  frequency?: string

  @Column({ nullable: true })
  enabled?: boolean

  @Column({})
  deviceId: string

  @ManyToOne(() => Device, parent => parent.shotSchedules)
  @JoinColumn({ name: 'deviceId' })
  device?: Device

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
