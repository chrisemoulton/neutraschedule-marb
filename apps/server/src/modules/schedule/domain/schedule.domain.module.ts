import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ScheduleDomainFacade } from './schedule.domain.facade'
import { Schedule } from './schedule.model'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), DatabaseHelperModule],
  providers: [ScheduleDomainFacade, ScheduleDomainFacade],
  exports: [ScheduleDomainFacade],
})
export class ScheduleDomainModule {}
