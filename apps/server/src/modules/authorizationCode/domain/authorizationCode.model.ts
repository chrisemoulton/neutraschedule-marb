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

@Entity()
export class AuthorizationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  code: string

  @Column({ nullable: true })
  expiresAt?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.authorizationCodes)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
