import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DeviceGroupMembershipCreateDto {
  @IsString()
  @IsOptional()
  groupId?: string

  @IsString()
  @IsOptional()
  deviceId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class DeviceGroupMembershipUpdateDto {
  @IsString()
  @IsOptional()
  groupId?: string

  @IsString()
  @IsOptional()
  deviceId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
