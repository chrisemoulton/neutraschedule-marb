import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RoleDomainModule } from '../domain'
import { RoleController } from './role.controller'

@Module({
  imports: [AuthenticationDomainModule, RoleDomainModule],
  controllers: [RoleController],
  providers: [],
})
export class RoleApplicationModule {}
