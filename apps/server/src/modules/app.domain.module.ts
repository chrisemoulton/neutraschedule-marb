import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { DeviceDomainModule } from './device/domain'

import { DeviceGroupDomainModule } from './deviceGroup/domain'

import { DeviceGroupMembershipDomainModule } from './deviceGroupMembership/domain'

import { LogDomainModule } from './log/domain'

import { AuthorizationCodeDomainModule } from './authorizationCode/domain'

import { RoleDomainModule } from './role/domain'

import { ShotDomainModule } from './shot/domain'

import { ShotScheduleDomainModule } from './shotSchedule/domain'

import { LiquidLevelDomainModule } from './liquidLevel/domain'

import { LowLiquidWarningDomainModule } from './lowLiquidWarning/domain'

import { RoomDomainModule } from './room/domain'

import { StrainDomainModule } from './strain/domain'

import { NutrientDomainModule } from './nutrient/domain'

import { ScheduleDomainModule } from './schedule/domain'

import { SessionDomainModule } from './session/domain'

import { SessionNutrientDomainModule } from './sessionNutrient/domain'

import { EnvironmentalConditionDomainModule } from './environmentalCondition/domain'

import { DataPointDomainModule } from './dataPoint/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    DeviceDomainModule,

    DeviceGroupDomainModule,

    DeviceGroupMembershipDomainModule,

    LogDomainModule,

    AuthorizationCodeDomainModule,

    RoleDomainModule,

    ShotDomainModule,

    ShotScheduleDomainModule,

    LiquidLevelDomainModule,

    LowLiquidWarningDomainModule,

    RoomDomainModule,

    StrainDomainModule,

    NutrientDomainModule,

    ScheduleDomainModule,

    SessionDomainModule,

    SessionNutrientDomainModule,

    EnvironmentalConditionDomainModule,

    DataPointDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
