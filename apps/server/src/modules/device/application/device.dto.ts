import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DeviceCreateDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  deviceType?: string

  @IsString()
  @IsOptional()
  firmwareVersion?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  lastCheck?: string

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

export class DeviceUpdateDto {
  @IsString()
  @IsOptional()
  serialNumber?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  deviceType?: string

  @IsString()
  @IsOptional()
  firmwareVersion?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  lastCheck?: string

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
