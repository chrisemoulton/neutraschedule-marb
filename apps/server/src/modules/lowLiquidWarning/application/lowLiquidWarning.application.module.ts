import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LowLiquidWarningDomainModule } from '../domain'
import { LowLiquidWarningController } from './lowLiquidWarning.controller'

import { LiquidLevelDomainModule } from '../../../modules/liquidLevel/domain'

import { LowLiquidWarningByLiquidLevelController } from './lowLiquidWarningByLiquidLevel.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LowLiquidWarningDomainModule,

    LiquidLevelDomainModule,
  ],
  controllers: [
    LowLiquidWarningController,

    LowLiquidWarningByLiquidLevelController,
  ],
  providers: [],
})
export class LowLiquidWarningApplicationModule {}
