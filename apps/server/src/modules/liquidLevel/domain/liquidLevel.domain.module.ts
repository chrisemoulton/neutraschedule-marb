import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LiquidLevelDomainFacade } from './liquidLevel.domain.facade'
import { LiquidLevel } from './liquidLevel.model'

@Module({
  imports: [TypeOrmModule.forFeature([LiquidLevel]), DatabaseHelperModule],
  providers: [LiquidLevelDomainFacade, LiquidLevelDomainFacade],
  exports: [LiquidLevelDomainFacade],
})
export class LiquidLevelDomainModule {}
