import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeviceDomainFacade } from '@server/modules/device/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeviceApplicationEvent } from './device.application.event'
import { DeviceCreateDto } from './device.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DeviceByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private deviceDomainFacade: DeviceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/devices')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.deviceDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/devices')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: DeviceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.deviceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DeviceApplicationEvent.DeviceCreated.Payload>(
      DeviceApplicationEvent.DeviceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
