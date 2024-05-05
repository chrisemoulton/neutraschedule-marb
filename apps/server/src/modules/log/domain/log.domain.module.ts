import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LogDomainFacade } from './log.domain.facade'
import { Log } from './log.model'

@Module({
  imports: [TypeOrmModule.forFeature([Log]), DatabaseHelperModule],
  providers: [LogDomainFacade, LogDomainFacade],
  exports: [LogDomainFacade],
})
export class LogDomainModule {}
