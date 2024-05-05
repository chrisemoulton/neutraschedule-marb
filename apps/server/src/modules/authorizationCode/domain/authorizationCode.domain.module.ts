import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AuthorizationCodeDomainFacade } from './authorizationCode.domain.facade'
import { AuthorizationCode } from './authorizationCode.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizationCode]),
    DatabaseHelperModule,
  ],
  providers: [AuthorizationCodeDomainFacade, AuthorizationCodeDomainFacade],
  exports: [AuthorizationCodeDomainFacade],
})
export class AuthorizationCodeDomainModule {}
