import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DataPointDomainModule } from '../domain'
import { DataPointController } from './dataPoint.controller'

import { SessionDomainModule } from '../../../modules/session/domain'

import { DataPointBySessionController } from './dataPointBySession.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DataPointDomainModule,

    SessionDomainModule,
  ],
  controllers: [DataPointController, DataPointBySessionController],
  providers: [],
})
export class DataPointApplicationModule {}
