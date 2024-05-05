import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { RoomDomainFacade } from './room.domain.facade'
import { Room } from './room.model'

@Module({
  imports: [TypeOrmModule.forFeature([Room]), DatabaseHelperModule],
  providers: [RoomDomainFacade, RoomDomainFacade],
  exports: [RoomDomainFacade],
})
export class RoomDomainModule {}
