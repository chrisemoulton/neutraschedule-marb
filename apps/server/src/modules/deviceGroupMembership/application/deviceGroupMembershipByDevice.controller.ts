import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeviceGroupMembershipDomainFacade } from '@server/modules/deviceGroupMembership/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeviceGroupMembershipApplicationEvent } from './deviceGroupMembership.application.event'
import { DeviceGroupMembershipCreateDto } from './deviceGroupMembership.dto'

import { DeviceDomainFacade } from '../../device/domain'

@Controller('/v1/devices')
export class DeviceGroupMembershipByDeviceController {
  constructor(
    private deviceDomainFacade: DeviceDomainFacade,

    private deviceGroupMembershipDomainFacade: DeviceGroupMembershipDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/device/:deviceId/deviceGroupMemberships')
  async findManyDeviceId(
    @Param('deviceId') deviceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceDomainFacade.findOneByIdOrFail(deviceId)

    const items = await this.deviceGroupMembershipDomainFacade.findManyByDevice(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/device/:deviceId/deviceGroupMemberships')
  async createByDeviceId(
    @Param('deviceId') deviceId: string,
    @Body() body: DeviceGroupMembershipCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, deviceId }

    const item =
      await this.deviceGroupMembershipDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DeviceGroupMembershipApplicationEvent.DeviceGroupMembershipCreated.Payload>(
      DeviceGroupMembershipApplicationEvent.DeviceGroupMembershipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
