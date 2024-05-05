import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EnvironmentalConditionDomainFacade } from './environmentalCondition.domain.facade'
import { EnvironmentalCondition } from './environmentalCondition.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([EnvironmentalCondition]),
    DatabaseHelperModule,
  ],
  providers: [
    EnvironmentalConditionDomainFacade,
    EnvironmentalConditionDomainFacade,
  ],
  exports: [EnvironmentalConditionDomainFacade],
})
export class EnvironmentalConditionDomainModule {}
