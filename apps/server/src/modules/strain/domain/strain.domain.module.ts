import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { StrainDomainFacade } from './strain.domain.facade'
import { Strain } from './strain.model'

@Module({
  imports: [TypeOrmModule.forFeature([Strain]), DatabaseHelperModule],
  providers: [StrainDomainFacade, StrainDomainFacade],
  exports: [StrainDomainFacade],
})
export class StrainDomainModule {}
