import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class LiquidLevelCreateDto {
  @IsString()
  @IsOptional()
  recordedTime?: string

  @IsNumber()
  @IsOptional()
  liquidLevel?: number

  @IsNumber()
  @IsOptional()
  lowLevelThreshold?: number

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

export class LiquidLevelUpdateDto {
  @IsString()
  @IsOptional()
  recordedTime?: string

  @IsNumber()
  @IsOptional()
  liquidLevel?: number

  @IsNumber()
  @IsOptional()
  lowLevelThreshold?: number

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
