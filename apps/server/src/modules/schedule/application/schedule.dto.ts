import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ScheduleCreateDto {
  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

  @IsString()
  @IsOptional()
  frequency?: string

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
  userId?: string

  @IsString()
  @IsOptional()
  roomId?: string

  @IsString()
  @IsOptional()
  strainId?: string
}

export class ScheduleUpdateDto {
  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

  @IsString()
  @IsOptional()
  frequency?: string

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
  userId?: string

  @IsString()
  @IsOptional()
  roomId?: string

  @IsString()
  @IsOptional()
  strainId?: string
}
