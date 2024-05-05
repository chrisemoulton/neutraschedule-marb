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

import { Notification } from '../../../modules/notification/domain'

import { Device } from '../../../modules/device/domain'

import { DeviceGroup } from '../../../modules/deviceGroup/domain'

import { Log } from '../../../modules/log/domain'

import { AuthorizationCode } from '../../../modules/authorizationCode/domain'

import { Schedule } from '../../../modules/schedule/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Device, child => child.user)
  devices?: Device[]

  @OneToMany(() => DeviceGroup, child => child.user)
  deviceGroups?: DeviceGroup[]

  @OneToMany(() => Log, child => child.user)
  logs?: Log[]

  @OneToMany(() => AuthorizationCode, child => child.user)
  authorizationCodes?: AuthorizationCode[]

  @OneToMany(() => Schedule, child => child.user)
  schedules?: Schedule[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
