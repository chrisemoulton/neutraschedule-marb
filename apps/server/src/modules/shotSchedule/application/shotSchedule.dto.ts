import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ShotScheduleCreateDto {
  @IsString()
  @IsOptional()
  scheduledTime?: string

  @IsString()
  @IsOptional()
  frequency?: string

  @IsBoolean()
  @IsOptional()
  enabled?: boolean

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

export class ShotScheduleUpdateDto {
  @IsString()
  @IsOptional()
  scheduledTime?: string

  @IsString()
  @IsOptional()
  frequency?: string

  @IsBoolean()
  @IsOptional()
  enabled?: boolean

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
