import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { StrainDomainModule } from '../domain'
import { StrainController } from './strain.controller'

@Module({
  imports: [AuthenticationDomainModule, StrainDomainModule],
  controllers: [StrainController],
  providers: [],
})
export class StrainApplicationModule {}
