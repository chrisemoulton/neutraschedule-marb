import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LiquidLevelDomainModule } from '../domain'
import { LiquidLevelController } from './liquidLevel.controller'

import { DeviceDomainModule } from '../../../modules/device/domain'

import { LiquidLevelByDeviceController } from './liquidLevelByDevice.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LiquidLevelDomainModule,

    DeviceDomainModule,
  ],
  controllers: [LiquidLevelController, LiquidLevelByDeviceController],
  providers: [],
})
export class LiquidLevelApplicationModule {}
