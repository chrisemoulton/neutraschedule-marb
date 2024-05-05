import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SessionDomainModule } from '../domain'
import { SessionController } from './session.controller'

import { ScheduleDomainModule } from '../../../modules/schedule/domain'

import { SessionByScheduleController } from './sessionBySchedule.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SessionDomainModule,

    ScheduleDomainModule,
  ],
  controllers: [SessionController, SessionByScheduleController],
  providers: [],
})
export class SessionApplicationModule {}
