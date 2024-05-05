import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ShotDomainModule } from '../domain'
import { ShotController } from './shot.controller'

import { DeviceDomainModule } from '../../../modules/device/domain'

import { ShotByDeviceController } from './shotByDevice.controller'

@Module({
  imports: [AuthenticationDomainModule, ShotDomainModule, DeviceDomainModule],
  controllers: [ShotController, ShotByDeviceController],
  providers: [],
})
export class ShotApplicationModule {}
