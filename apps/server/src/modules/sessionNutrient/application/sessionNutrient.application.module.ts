import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SessionNutrientDomainModule } from '../domain'
import { SessionNutrientController } from './sessionNutrient.controller'

import { SessionDomainModule } from '../../../modules/session/domain'

import { SessionNutrientBySessionController } from './sessionNutrientBySession.controller'

import { NutrientDomainModule } from '../../../modules/nutrient/domain'

import { SessionNutrientByNutrientController } from './sessionNutrientByNutrient.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SessionNutrientDomainModule,

    SessionDomainModule,

    NutrientDomainModule,
  ],
  controllers: [
    SessionNutrientController,

    SessionNutrientBySessionController,

    SessionNutrientByNutrientController,
  ],
  providers: [],
})
export class SessionNutrientApplicationModule {}
