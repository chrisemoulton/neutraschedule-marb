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

import { DeviceGroupMembership } from '../../../modules/deviceGroupMembership/domain'

import { Notification } from '../../../modules/notification/domain'

import { Log } from '../../../modules/log/domain'

import { Shot } from '../../../modules/shot/domain'

import { ShotSchedule } from '../../../modules/shotSchedule/domain'

import { LiquidLevel } from '../../../modules/liquidLevel/domain'

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  serialNumber: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  deviceType?: string

  @Column({ nullable: true })
  firmwareVersion?: string

  @Column({ nullable: true })
  status?: string

  @Column({ nullable: true })
  lastCheck?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.devices)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => DeviceGroupMembership, child => child.device)
  deviceGroupMemberships?: DeviceGroupMembership[]

  @OneToMany(() => Notification, child => child.device)
  notifications?: Notification[]

  @OneToMany(() => Log, child => child.device)
  logs?: Log[]

  @OneToMany(() => Shot, child => child.device)
  shots?: Shot[]

  @OneToMany(() => ShotSchedule, child => child.device)
  shotSchedules?: ShotSchedule[]

  @OneToMany(() => LiquidLevel, child => child.device)
  liquidLevels?: LiquidLevel[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
