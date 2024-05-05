import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { DeviceApi } from './device/device.api'

import { DeviceGroupApi } from './deviceGroup/deviceGroup.api'

import { DeviceGroupMembershipApi } from './deviceGroupMembership/deviceGroupMembership.api'

import { LogApi } from './log/log.api'

import { AuthorizationCodeApi } from './authorizationCode/authorizationCode.api'

import { RoleApi } from './role/role.api'

import { ShotApi } from './shot/shot.api'

import { ShotScheduleApi } from './shotSchedule/shotSchedule.api'

import { LiquidLevelApi } from './liquidLevel/liquidLevel.api'

import { LowLiquidWarningApi } from './lowLiquidWarning/lowLiquidWarning.api'

import { RoomApi } from './room/room.api'

import { StrainApi } from './strain/strain.api'

import { NutrientApi } from './nutrient/nutrient.api'

import { ScheduleApi } from './schedule/schedule.api'

import { SessionApi } from './session/session.api'

import { SessionNutrientApi } from './sessionNutrient/sessionNutrient.api'

import { EnvironmentalConditionApi } from './environmentalCondition/environmentalCondition.api'

import { DataPointApi } from './dataPoint/dataPoint.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Device extends DeviceApi {}

  export class DeviceGroup extends DeviceGroupApi {}

  export class DeviceGroupMembership extends DeviceGroupMembershipApi {}

  export class Log extends LogApi {}

  export class AuthorizationCode extends AuthorizationCodeApi {}

  export class Role extends RoleApi {}

  export class Shot extends ShotApi {}

  export class ShotSchedule extends ShotScheduleApi {}

  export class LiquidLevel extends LiquidLevelApi {}

  export class LowLiquidWarning extends LowLiquidWarningApi {}

  export class Room extends RoomApi {}

  export class Strain extends StrainApi {}

  export class Nutrient extends NutrientApi {}

  export class Schedule extends ScheduleApi {}

  export class Session extends SessionApi {}

  export class SessionNutrient extends SessionNutrientApi {}

  export class EnvironmentalCondition extends EnvironmentalConditionApi {}

  export class DataPoint extends DataPointApi {}
}
