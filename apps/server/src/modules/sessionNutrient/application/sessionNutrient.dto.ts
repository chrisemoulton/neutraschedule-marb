import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class SessionNutrientCreateDto {
  @IsNumber()
  @IsOptional()
  quantityUsed?: number

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

  @IsString()
  @IsOptional()
  nutrientId?: string
}

export class SessionNutrientUpdateDto {
  @IsNumber()
  @IsOptional()
  quantityUsed?: number

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

  @IsString()
  @IsOptional()
  nutrientId?: string
}
