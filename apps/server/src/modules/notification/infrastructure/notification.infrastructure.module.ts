import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationDeviceSubscriber } from './subscribers/notification.device.subscriber'

import { NotificationDeviceGroupSubscriber } from './subscribers/notification.deviceGroup.subscriber'

import { NotificationDeviceGroupMembershipSubscriber } from './subscribers/notification.deviceGroupMembership.subscriber'

import { NotificationLogSubscriber } from './subscribers/notification.log.subscriber'

import { NotificationAuthorizationCodeSubscriber } from './subscribers/notification.authorizationCode.subscriber'

import { NotificationRoleSubscriber } from './subscribers/notification.role.subscriber'

import { NotificationShotSubscriber } from './subscribers/notification.shot.subscriber'

import { NotificationShotScheduleSubscriber } from './subscribers/notification.shotSchedule.subscriber'

import { NotificationLiquidLevelSubscriber } from './subscribers/notification.liquidLevel.subscriber'

import { NotificationLowLiquidWarningSubscriber } from './subscribers/notification.lowLiquidWarning.subscriber'

import { NotificationRoomSubscriber } from './subscribers/notification.room.subscriber'

import { NotificationStrainSubscriber } from './subscribers/notification.strain.subscriber'

import { NotificationNutrientSubscriber } from './subscribers/notification.nutrient.subscriber'

import { NotificationScheduleSubscriber } from './subscribers/notification.schedule.subscriber'

import { NotificationSessionSubscriber } from './subscribers/notification.session.subscriber'

import { NotificationSessionNutrientSubscriber } from './subscribers/notification.sessionNutrient.subscriber'

import { NotificationEnvironmentalConditionSubscriber } from './subscribers/notification.environmentalCondition.subscriber'

import { NotificationDataPointSubscriber } from './subscribers/notification.dataPoint.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationDeviceSubscriber,

    NotificationDeviceGroupSubscriber,

    NotificationDeviceGroupMembershipSubscriber,

    NotificationLogSubscriber,

    NotificationAuthorizationCodeSubscriber,

    NotificationRoleSubscriber,

    NotificationShotSubscriber,

    NotificationShotScheduleSubscriber,

    NotificationLiquidLevelSubscriber,

    NotificationLowLiquidWarningSubscriber,

    NotificationRoomSubscriber,

    NotificationStrainSubscriber,

    NotificationNutrientSubscriber,

    NotificationScheduleSubscriber,

    NotificationSessionSubscriber,

    NotificationSessionNutrientSubscriber,

    NotificationEnvironmentalConditionSubscriber,

    NotificationDataPointSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
