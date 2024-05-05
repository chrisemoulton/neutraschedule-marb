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

import { SessionNutrient } from '../../../modules/sessionNutrient/domain'

@Entity()
export class Nutrient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  type?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  concentration?: number

  @OneToMany(() => SessionNutrient, child => child.nutrient)
  sessionNutrients?: SessionNutrient[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
