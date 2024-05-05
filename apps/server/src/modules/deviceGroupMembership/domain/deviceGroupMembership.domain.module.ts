import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DeviceGroupMembershipDomainFacade } from './deviceGroupMembership.domain.facade'
import { DeviceGroupMembership } from './deviceGroupMembership.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceGroupMembership]),
    DatabaseHelperModule,
  ],
  providers: [
    DeviceGroupMembershipDomainFacade,
    DeviceGroupMembershipDomainFacade,
  ],
  exports: [DeviceGroupMembershipDomainFacade],
})
export class DeviceGroupMembershipDomainModule {}
