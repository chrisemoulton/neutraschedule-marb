import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LiquidLevelDomainFacade } from '@server/modules/liquidLevel/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LiquidLevelApplicationEvent } from './liquidLevel.application.event'
import { LiquidLevelCreateDto } from './liquidLevel.dto'

import { DeviceDomainFacade } from '../../device/domain'

@Controller('/v1/devices')
export class LiquidLevelByDeviceController {
  constructor(
    private deviceDomainFacade: DeviceDomainFacade,

    private liquidLevelDomainFacade: LiquidLevelDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/device/:deviceId/liquidLevels')
  async findManyDeviceId(
    @Param('deviceId') deviceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const items = await this.liquidLevelDomainFacade.findManyByDevice(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/device/:deviceId/liquidLevels')
  async createByDeviceId(
    @Param('deviceId') deviceId: string,
    @Body() body: LiquidLevelCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, deviceId }

    const item = await this.liquidLevelDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LiquidLevelApplicationEvent.LiquidLevelCreated.Payload>(
      LiquidLevelApplicationEvent.LiquidLevelCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
