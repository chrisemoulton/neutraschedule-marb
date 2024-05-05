import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class SessionCreateDto {
  @IsString()
  @IsOptional()
  actualStartTime?: string

  @IsString()
  @IsOptional()
  actualEndTime?: string

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
  scheduleId?: string
}

export class SessionUpdateDto {
  @IsString()
  @IsOptional()
  actualStartTime?: string

  @IsString()
  @IsOptional()
  actualEndTime?: string

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
  scheduleId?: string
}
