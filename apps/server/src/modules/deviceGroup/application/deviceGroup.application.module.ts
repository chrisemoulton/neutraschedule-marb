import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DeviceGroupDomainModule } from '../domain'
import { DeviceGroupController } from './deviceGroup.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DeviceGroupByUserController } from './deviceGroupByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DeviceGroupDomainModule,

    UserDomainModule,
  ],
  controllers: [DeviceGroupController, DeviceGroupByUserController],
  providers: [],
})
export class DeviceGroupApplicationModule {}
