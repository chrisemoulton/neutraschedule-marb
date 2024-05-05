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

import { LowLiquidWarning } from '../../../modules/lowLiquidWarning/domain'

@Entity()
export class LiquidLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  recordedTime?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  liquidLevel?: number

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  lowLevelThreshold?: number

  @Column({})
  deviceId: string

  @ManyToOne(() => Device, parent => parent.liquidLevels)
  @JoinColumn({ name: 'deviceId' })
  device?: Device

  @OneToMany(() => LowLiquidWarning, child => child.level)
  lowLiquidWarningsAsLevel?: LowLiquidWarning[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
