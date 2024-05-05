import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DeviceGroupMembershipDomainModule } from '../domain'
import { DeviceGroupMembershipController } from './deviceGroupMembership.controller'

import { DeviceGroupDomainModule } from '../../../modules/deviceGroup/domain'

import { DeviceGroupMembershipByDeviceGroupController } from './deviceGroupMembershipByDeviceGroup.controller'

import { DeviceDomainModule } from '../../../modules/device/domain'

import { DeviceGroupMembershipByDeviceController } from './deviceGroupMembershipByDevice.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DeviceGroupMembershipDomainModule,

    DeviceGroupDomainModule,

    DeviceDomainModule,
  ],
  controllers: [
    DeviceGroupMembershipController,

    DeviceGroupMembershipByDeviceGroupController,

    DeviceGroupMembershipByDeviceController,
  ],
  providers: [],
})
export class DeviceGroupMembershipApplicationModule {}
