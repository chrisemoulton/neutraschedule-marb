import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class LogCreateDto {
  @IsString()
  @IsOptional()
  event?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  severity?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsOptional()
  data?: any

  @IsString()
  @IsOptional()
  sourceIp?: string

  @IsString()
  @IsOptional()
  deviceId?: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class LogUpdateDto {
  @IsString()
  @IsOptional()
  event?: string

  @IsString()
  @IsOptional()
  timestamp?: string

  @IsString()
  @IsOptional()
  severity?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsOptional()
  data?: any

  @IsString()
  @IsOptional()
  sourceIp?: string

  @IsString()
  @IsOptional()
  deviceId?: string

  @IsString()
  @IsOptional()
  userId?: string

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
