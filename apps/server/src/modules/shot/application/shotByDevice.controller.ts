import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ShotDomainFacade } from '@server/modules/shot/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ShotApplicationEvent } from './shot.application.event'
import { ShotCreateDto } from './shot.dto'

import { DeviceDomainFacade } from '../../device/domain'

@Controller('/v1/devices')
export class ShotByDeviceController {
  constructor(
    private deviceDomainFacade: DeviceDomainFacade,

    private shotDomainFacade: ShotDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/device/:deviceId/shots')
  async findManyDeviceId(
    @Param('deviceId') deviceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const items = await this.shotDomainFacade.findManyByDevice(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/device/:deviceId/shots')
  async createByDeviceId(
    @Param('deviceId') deviceId: string,
    @Body() body: ShotCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, deviceId }

    const item = await this.shotDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ShotApplicationEvent.ShotCreated.Payload>(
      ShotApplicationEvent.ShotCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
