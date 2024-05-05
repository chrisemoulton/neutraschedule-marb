import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DeviceDomainModule } from '../domain'
import { DeviceController } from './device.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DeviceByUserController } from './deviceByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, DeviceDomainModule, UserDomainModule],
  controllers: [DeviceController, DeviceByUserController],
  providers: [],
})
export class DeviceApplicationModule {}
