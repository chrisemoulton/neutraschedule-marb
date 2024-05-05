import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LogDomainModule } from '../domain'
import { LogController } from './log.controller'

import { DeviceDomainModule } from '../../../modules/device/domain'

import { LogByDeviceController } from './logByDevice.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { LogByUserController } from './logByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LogDomainModule,

    DeviceDomainModule,

    UserDomainModule,
  ],
  controllers: [LogController, LogByDeviceController, LogByUserController],
  providers: [],
})
export class LogApplicationModule {}
