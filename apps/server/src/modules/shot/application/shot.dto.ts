import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ShotCreateDto {
  @IsString()
  @IsOptional()
  shotTime?: string

  @IsString()
  @IsOptional()
  shotType?: string

  @IsString()
  @IsOptional()
  outcome?: string

  @IsOptional()
  details?: any

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

export class ShotUpdateDto {
  @IsString()
  @IsOptional()
  shotTime?: string

  @IsString()
  @IsOptional()
  shotType?: string

  @IsString()
  @IsOptional()
  outcome?: string

  @IsOptional()
  details?: any

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
