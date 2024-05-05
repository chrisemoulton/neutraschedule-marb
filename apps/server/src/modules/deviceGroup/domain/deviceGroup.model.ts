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

@Entity()
export class DeviceGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.deviceGroups)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => DeviceGroupMembership, child => child.group)
  deviceGroupMembershipsAsGroup?: DeviceGroupMembership[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
