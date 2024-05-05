import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ShotScheduleDomainFacade } from '@server/modules/shotSchedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ShotScheduleApplicationEvent } from './shotSchedule.application.event'
import { ShotScheduleCreateDto } from './shotSchedule.dto'

import { DeviceDomainFacade } from '../../device/domain'

@Controller('/v1/devices')
export class ShotScheduleByDeviceController {
  constructor(
    private deviceDomainFacade: DeviceDomainFacade,

    private shotScheduleDomainFacade: ShotScheduleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/device/:deviceId/shotSchedules')
  async findManyDeviceId(
    @Param('deviceId') deviceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const items = await this.shotScheduleDomainFacade.findManyByDevice(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/device/:deviceId/shotSchedules')
  async createByDeviceId(
    @Param('deviceId') deviceId: string,
    @Body() body: ShotScheduleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, deviceId }

    const item = await this.shotScheduleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ShotScheduleApplicationEvent.ShotScheduleCreated.Payload>(
      ShotScheduleApplicationEvent.ShotScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
