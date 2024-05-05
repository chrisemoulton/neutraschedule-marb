import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EnvironmentalConditionCreateDto {
  @IsNumber()
  @IsOptional()
  temperature?: number

  @IsNumber()
  @IsOptional()
  humidity?: number

  @IsNumber()
  @IsOptional()
  co2level?: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  sessionId?: string
}

export class EnvironmentalConditionUpdateDto {
  @IsNumber()
  @IsOptional()
  temperature?: number

  @IsNumber()
  @IsOptional()
  humidity?: number

  @IsNumber()
  @IsOptional()
  co2level?: number

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  sessionId?: string
}
