import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeviceGroupMembershipDomainFacade } from '@server/modules/deviceGroupMembership/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeviceGroupMembershipApplicationEvent } from './deviceGroupMembership.application.event'
import { DeviceGroupMembershipCreateDto } from './deviceGroupMembership.dto'

import { DeviceGroupDomainFacade } from '../../deviceGroup/domain'

@Controller('/v1/deviceGroups')
export class DeviceGroupMembershipByDeviceGroupController {
  constructor(
    private deviceGroupDomainFacade: DeviceGroupDomainFacade,

    private deviceGroupMembershipDomainFacade: DeviceGroupMembershipDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/deviceGroupMemberships')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.deviceGroupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.deviceGroupMembershipDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/deviceGroupMemberships')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: DeviceGroupMembershipCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

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
