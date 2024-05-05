import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class StrainCreateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsOptional()
  optimalTemperature?: number

  @IsNumber()
  @IsOptional()
  optimalHumidity?: number

  @IsNumber()
  @IsOptional()
  optimalCo2level?: number

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

export class StrainUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNumber()
  @IsOptional()
  optimalTemperature?: number

  @IsNumber()
  @IsOptional()
  optimalHumidity?: number

  @IsNumber()
  @IsOptional()
  optimalCo2level?: number

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
