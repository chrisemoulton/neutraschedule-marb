import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { RoomDomainModule } from '../domain'
import { RoomController } from './room.controller'

@Module({
  imports: [AuthenticationDomainModule, RoomDomainModule],
  controllers: [RoomController],
  providers: [],
})
export class RoomApplicationModule {}
