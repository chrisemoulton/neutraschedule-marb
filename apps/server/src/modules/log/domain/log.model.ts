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

import { User } from '../../../modules/user/domain'

@Entity()
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  event?: string

  @Column({ nullable: true })
  timestamp?: string

  @Column({ nullable: true })
  severity?: string

  @Column({ nullable: true })
  category?: string

  data?: any

  @Column({ nullable: true })
  sourceIp?: string

  @Column({})
  deviceId: string

  @ManyToOne(() => Device, parent => parent.logs)
  @JoinColumn({ name: 'deviceId' })
  device?: Device

  @Column({ nullable: true })
  userId?: string

  @ManyToOne(() => User, parent => parent.logs)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
