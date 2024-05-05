import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DeviceGroupDomainFacade } from './deviceGroup.domain.facade'
import { DeviceGroup } from './deviceGroup.model'

@Module({
  imports: [TypeOrmModule.forFeature([DeviceGroup]), DatabaseHelperModule],
  providers: [DeviceGroupDomainFacade, DeviceGroupDomainFacade],
  exports: [DeviceGroupDomainFacade],
})
export class DeviceGroupDomainModule {}
