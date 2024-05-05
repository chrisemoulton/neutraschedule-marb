import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DataPointDomainFacade } from './dataPoint.domain.facade'
import { DataPoint } from './dataPoint.model'

@Module({
  imports: [TypeOrmModule.forFeature([DataPoint]), DatabaseHelperModule],
  providers: [DataPointDomainFacade, DataPointDomainFacade],
  exports: [DataPointDomainFacade],
})
export class DataPointDomainModule {}
