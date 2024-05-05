import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DeviceDomainFacade } from './device.domain.facade'
import { Device } from './device.model'

@Module({
  imports: [TypeOrmModule.forFeature([Device]), DatabaseHelperModule],
  providers: [DeviceDomainFacade, DeviceDomainFacade],
  exports: [DeviceDomainFacade],
})
export class DeviceDomainModule {}
