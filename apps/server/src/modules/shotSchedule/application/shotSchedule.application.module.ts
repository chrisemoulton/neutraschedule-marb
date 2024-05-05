import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ShotScheduleDomainModule } from '../domain'
import { ShotScheduleController } from './shotSchedule.controller'

import { DeviceDomainModule } from '../../../modules/device/domain'

import { ShotScheduleByDeviceController } from './shotScheduleByDevice.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ShotScheduleDomainModule,

    DeviceDomainModule,
  ],
  controllers: [ShotScheduleController, ShotScheduleByDeviceController],
  providers: [],
})
export class ShotScheduleApplicationModule {}
