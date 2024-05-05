import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class LowLiquidWarningCreateDto {
  @IsString()
  @IsOptional()
  warningTime?: string

  @IsBoolean()
  @IsOptional()
  acknowledged?: boolean

  @IsString()
  @IsOptional()
  levelId?: string

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

export class LowLiquidWarningUpdateDto {
  @IsString()
  @IsOptional()
  warningTime?: string

  @IsBoolean()
  @IsOptional()
  acknowledged?: boolean

  @IsString()
  @IsOptional()
  levelId?: string

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
