import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { NutrientDomainModule } from '../domain'
import { NutrientController } from './nutrient.controller'

@Module({
  imports: [AuthenticationDomainModule, NutrientDomainModule],
  controllers: [NutrientController],
  providers: [],
})
export class NutrientApplicationModule {}
