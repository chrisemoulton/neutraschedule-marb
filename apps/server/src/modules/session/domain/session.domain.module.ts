import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SessionDomainFacade } from './session.domain.facade'
import { Session } from './session.model'

@Module({
  imports: [TypeOrmModule.forFeature([Session]), DatabaseHelperModule],
  providers: [SessionDomainFacade, SessionDomainFacade],
  exports: [SessionDomainFacade],
})
export class SessionDomainModule {}
