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

import { LiquidLevel } from '../../../modules/liquidLevel/domain'

@Entity()
export class LowLiquidWarning {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  warningTime?: string

  @Column({ nullable: true })
  acknowledged?: boolean

  @Column({})
  levelId: string

  @ManyToOne(() => LiquidLevel, parent => parent.lowLiquidWarningsAsLevel)
  @JoinColumn({ name: 'levelId' })
  level?: LiquidLevel

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
