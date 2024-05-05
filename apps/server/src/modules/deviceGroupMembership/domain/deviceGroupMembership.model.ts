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

import { DeviceGroup } from '../../../modules/deviceGroup/domain'

import { Device } from '../../../modules/device/domain'

@Entity()
export class DeviceGroupMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  groupId: string

  @ManyToOne(() => DeviceGroup, parent => parent.deviceGroupMembershipsAsGroup)
  @JoinColumn({ name: 'groupId' })
  group?: DeviceGroup

  @Column({})
  deviceId: string

  @ManyToOne(() => Device, parent => parent.deviceGroupMemberships)
  @JoinColumn({ name: 'deviceId' })
  device?: Device

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
