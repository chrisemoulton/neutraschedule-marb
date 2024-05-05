import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class NutrientCreateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsNumber()
  @IsOptional()
  concentration?: number

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

export class NutrientUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsNumber()
  @IsOptional()
  concentration?: number

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
