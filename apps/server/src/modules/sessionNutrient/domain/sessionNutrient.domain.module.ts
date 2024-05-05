import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SessionNutrientDomainFacade } from './sessionNutrient.domain.facade'
import { SessionNutrient } from './sessionNutrient.model'

@Module({
  imports: [TypeOrmModule.forFeature([SessionNutrient]), DatabaseHelperModule],
  providers: [SessionNutrientDomainFacade, SessionNutrientDomainFacade],
  exports: [SessionNutrientDomainFacade],
})
export class SessionNutrientDomainModule {}
