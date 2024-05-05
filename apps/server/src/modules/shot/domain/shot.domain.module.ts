import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ShotDomainFacade } from './shot.domain.facade'
import { Shot } from './shot.model'

@Module({
  imports: [TypeOrmModule.forFeature([Shot]), DatabaseHelperModule],
  providers: [ShotDomainFacade, ShotDomainFacade],
  exports: [ShotDomainFacade],
})
export class ShotDomainModule {}
