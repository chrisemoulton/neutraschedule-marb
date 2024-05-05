import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RoleDomainFacade } from './role.domain.facade'
import { Role } from './role.model'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), DatabaseHelperModule],
  providers: [RoleDomainFacade, RoleDomainFacade],
  exports: [RoleDomainFacade],
})
export class RoleDomainModule {}
