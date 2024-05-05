import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EnvironmentalConditionDomainModule } from '../domain'
import { EnvironmentalConditionController } from './environmentalCondition.controller'

import { SessionDomainModule } from '../../../modules/session/domain'

import { EnvironmentalConditionBySessionController } from './environmentalConditionBySession.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    EnvironmentalConditionDomainModule,

    SessionDomainModule,
  ],
  controllers: [
    EnvironmentalConditionController,

    EnvironmentalConditionBySessionController,
  ],
  providers: [],
})
export class EnvironmentalConditionApplicationModule {}
