import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LowLiquidWarningDomainFacade } from './lowLiquidWarning.domain.facade'
import { LowLiquidWarning } from './lowLiquidWarning.model'

@Module({
  imports: [TypeOrmModule.forFeature([LowLiquidWarning]), DatabaseHelperModule],
  providers: [LowLiquidWarningDomainFacade, LowLiquidWarningDomainFacade],
  exports: [LowLiquidWarningDomainFacade],
})
export class LowLiquidWarningDomainModule {}
