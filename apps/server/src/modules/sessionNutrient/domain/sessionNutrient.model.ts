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

import { Session } from '../../../modules/session/domain'

import { Nutrient } from '../../../modules/nutrient/domain'

@Entity()
export class SessionNutrient {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  quantityUsed?: number

  @Column({ nullable: true })
  sessionId?: string

  @ManyToOne(() => Session, parent => parent.sessionNutrients)
  @JoinColumn({ name: 'sessionId' })
  session?: Session

  @Column({ nullable: true })
  nutrientId?: string

  @ManyToOne(() => Nutrient, parent => parent.sessionNutrients)
  @JoinColumn({ name: 'nutrientId' })
  nutrient?: Nutrient

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
