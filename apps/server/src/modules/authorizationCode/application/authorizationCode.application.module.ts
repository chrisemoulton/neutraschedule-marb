import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AuthorizationCodeDomainModule } from '../domain'
import { AuthorizationCodeController } from './authorizationCode.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AuthorizationCodeByUserController } from './authorizationCodeByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationCodeDomainModule,

    UserDomainModule,
  ],
  controllers: [AuthorizationCodeController, AuthorizationCodeByUserController],
  providers: [],
})
export class AuthorizationCodeApplicationModule {}
