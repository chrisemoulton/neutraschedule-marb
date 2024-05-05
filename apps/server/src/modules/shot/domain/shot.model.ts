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
export class Shot {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  shotTime?: string

  @Column({ nullable: true })
  shotType?: string

  @Column({ nullable: true })
  outcome?: string

  details?: any

  @Column({})
  deviceId: string

  @ManyToOne(() => Device, parent => parent.shots)
  @JoinColumn({ name: 'deviceId' })
  device?: Device

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
