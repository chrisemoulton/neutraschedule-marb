import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { DeviceApplicationModule } from './device/application'

import { DeviceGroupApplicationModule } from './deviceGroup/application'

import { DeviceGroupMembershipApplicationModule } from './deviceGroupMembership/application'

import { LogApplicationModule } from './log/application'

import { AuthorizationCodeApplicationModule } from './authorizationCode/application'

import { RoleApplicationModule } from './role/application'

import { ShotApplicationModule } from './shot/application'

import { ShotScheduleApplicationModule } from './shotSchedule/application'

import { LiquidLevelApplicationModule } from './liquidLevel/application'

import { LowLiquidWarningApplicationModule } from './lowLiquidWarning/application'

import { RoomApplicationModule } from './room/application'

import { StrainApplicationModule } from './strain/application'

import { NutrientApplicationModule } from './nutrient/application'

import { ScheduleApplicationModule } from './schedule/application'

import { SessionApplicationModule } from './session/application'

import { SessionNutrientApplicationModule } from './sessionNutrient/application'

import { EnvironmentalConditionApplicationModule } from './environmentalCondition/application'

import { DataPointApplicationModule } from './dataPoint/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    DeviceApplicationModule,

    DeviceGroupApplicationModule,

    DeviceGroupMembershipApplicationModule,

    LogApplicationModule,

    AuthorizationCodeApplicationModule,

    RoleApplicationModule,

    ShotApplicationModule,

    ShotScheduleApplicationModule,

    LiquidLevelApplicationModule,

    LowLiquidWarningApplicationModule,

    RoomApplicationModule,

    StrainApplicationModule,

    NutrientApplicationModule,

    ScheduleApplicationModule,

    SessionApplicationModule,

    SessionNutrientApplicationModule,

    EnvironmentalConditionApplicationModule,

    DataPointApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
