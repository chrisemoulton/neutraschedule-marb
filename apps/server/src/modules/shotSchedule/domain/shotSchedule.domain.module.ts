import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ShotScheduleDomainFacade } from './shotSchedule.domain.facade'
import { ShotSchedule } from './shotSchedule.model'

@Module({
  imports: [TypeOrmModule.forFeature([ShotSchedule]), DatabaseHelperModule],
  providers: [ShotScheduleDomainFacade, ShotScheduleDomainFacade],
  exports: [ShotScheduleDomainFacade],
})
export class ShotScheduleDomainModule {}
