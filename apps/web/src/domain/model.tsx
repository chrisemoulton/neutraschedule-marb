import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Device as DeviceModel } from './device/device.model'

import { DeviceGroup as DeviceGroupModel } from './deviceGroup/deviceGroup.model'

import { DeviceGroupMembership as DeviceGroupMembershipModel } from './deviceGroupMembership/deviceGroupMembership.model'

import { Log as LogModel } from './log/log.model'

import { AuthorizationCode as AuthorizationCodeModel } from './authorizationCode/authorizationCode.model'

import { Role as RoleModel } from './role/role.model'

import { Shot as ShotModel } from './shot/shot.model'

import { ShotSchedule as ShotScheduleModel } from './shotSchedule/shotSchedule.model'

import { LiquidLevel as LiquidLevelModel } from './liquidLevel/liquidLevel.model'

import { LowLiquidWarning as LowLiquidWarningModel } from './lowLiquidWarning/lowLiquidWarning.model'

import { Room as RoomModel } from './room/room.model'

import { Strain as StrainModel } from './strain/strain.model'

import { Nutrient as NutrientModel } from './nutrient/nutrient.model'

import { Schedule as ScheduleModel } from './schedule/schedule.model'

import { Session as SessionModel } from './session/session.model'

import { SessionNutrient as SessionNutrientModel } from './sessionNutrient/sessionNutrient.model'

import { EnvironmentalCondition as EnvironmentalConditionModel } from './environmentalCondition/environmentalCondition.model'

import { DataPoint as DataPointModel } from './dataPoint/dataPoint.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Device extends DeviceModel {}

  export class DeviceGroup extends DeviceGroupModel {}

  export class DeviceGroupMembership extends DeviceGroupMembershipModel {}

  export class Log extends LogModel {}

  export class AuthorizationCode extends AuthorizationCodeModel {}

  export class Role extends RoleModel {}

  export class Shot extends ShotModel {}

  export class ShotSchedule extends ShotScheduleModel {}

  export class LiquidLevel extends LiquidLevelModel {}

  export class LowLiquidWarning extends LowLiquidWarningModel {}

  export class Room extends RoomModel {}

  export class Strain extends StrainModel {}

  export class Nutrient extends NutrientModel {}

  export class Schedule extends ScheduleModel {}

  export class Session extends SessionModel {}

  export class SessionNutrient extends SessionNutrientModel {}

  export class EnvironmentalCondition extends EnvironmentalConditionModel {}

  export class DataPoint extends DataPointModel {}
}
