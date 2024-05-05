import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { NutrientDomainFacade } from './nutrient.domain.facade'
import { Nutrient } from './nutrient.model'

@Module({
  imports: [TypeOrmModule.forFeature([Nutrient]), DatabaseHelperModule],
  providers: [NutrientDomainFacade, NutrientDomainFacade],
  exports: [NutrientDomainFacade],
})
export class NutrientDomainModule {}
