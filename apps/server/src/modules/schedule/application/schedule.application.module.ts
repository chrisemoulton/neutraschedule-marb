import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ScheduleDomainModule } from '../domain'
import { ScheduleController } from './schedule.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ScheduleByUserController } from './scheduleByUser.controller'

import { RoomDomainModule } from '../../../modules/room/domain'

import { ScheduleByRoomController } from './scheduleByRoom.controller'

import { StrainDomainModule } from '../../../modules/strain/domain'

import { ScheduleByStrainController } from './scheduleByStrain.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ScheduleDomainModule,

    UserDomainModule,

    RoomDomainModule,

    StrainDomainModule,
  ],
  controllers: [
    ScheduleController,

    ScheduleByUserController,

    ScheduleByRoomController,

    ScheduleByStrainController,
  ],
  providers: [],
})
export class ScheduleApplicationModule {}
