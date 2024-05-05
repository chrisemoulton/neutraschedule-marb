import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LogDomainFacade } from '@server/modules/log/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LogApplicationEvent } from './log.application.event'
import { LogCreateDto } from './log.dto'

import { DeviceDomainFacade } from '../../device/domain'

@Controller('/v1/devices')
export class LogByDeviceController {
  constructor(
    private deviceDomainFacade: DeviceDomainFacade,

    private logDomainFacade: LogDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/device/:deviceId/logs')
  async findManyDeviceId(
    @Param('deviceId') deviceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const items = await this.logDomainFacade.findManyByDevice(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/device/:deviceId/logs')
  async createByDeviceId(
    @Param('deviceId') deviceId: string,
    @Body() body: LogCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, deviceId }

    const item = await this.logDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LogApplicationEvent.LogCreated.Payload>(
      LogApplicationEvent.LogCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
