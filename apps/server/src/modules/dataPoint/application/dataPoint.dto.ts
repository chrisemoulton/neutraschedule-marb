import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DataPointCreateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsNumber()
  @IsOptional()
  value?: number

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

export class DataPointUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsNumber()
  @IsOptional()
  value?: number

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
