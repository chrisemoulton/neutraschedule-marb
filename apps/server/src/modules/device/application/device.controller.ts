import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Device, DeviceDomainFacade } from '@server/modules/device/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DeviceApplicationEvent } from './device.application.event'
import { DeviceCreateDto, DeviceUpdateDto } from './device.dto'

@Controller('/v1/devices')
export class DeviceController {
  constructor(
    private eventService: EventService,
    private deviceDomainFacade: DeviceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.deviceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DeviceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.deviceDomainFacade.create(body)

    await this.eventService.emit<DeviceApplicationEvent.DeviceCreated.Payload>(
      DeviceApplicationEvent.DeviceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:deviceId')
  async findOne(@Param('deviceId') deviceId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.deviceDomainFacade.findOneByIdOrFail(
      deviceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:deviceId')
  async update(
    @Param('deviceId') deviceId: string,
    @Body() body: DeviceUpdateDto,
  ) {
    const item = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const itemUpdated = await this.deviceDomainFacade.update(
      item,
      body as Partial<Device>,
    )
    return itemUpdated
  }

  @Delete('/:deviceId')
  async delete(@Param('deviceId') deviceId: string) {
    const item = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    await this.deviceDomainFacade.delete(item)

    return item
  }
}
