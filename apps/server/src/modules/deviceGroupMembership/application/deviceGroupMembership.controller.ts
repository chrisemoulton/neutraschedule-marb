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
import {
  DeviceGroupMembership,
  DeviceGroupMembershipDomainFacade,
} from '@server/modules/deviceGroupMembership/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DeviceGroupMembershipApplicationEvent } from './deviceGroupMembership.application.event'
import {
  DeviceGroupMembershipCreateDto,
  DeviceGroupMembershipUpdateDto,
} from './deviceGroupMembership.dto'

@Controller('/v1/deviceGroupMemberships')
export class DeviceGroupMembershipController {
  constructor(
    private eventService: EventService,
    private deviceGroupMembershipDomainFacade: DeviceGroupMembershipDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.deviceGroupMembershipDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: DeviceGroupMembershipCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.deviceGroupMembershipDomainFacade.create(body)

    await this.eventService.emit<DeviceGroupMembershipApplicationEvent.DeviceGroupMembershipCreated.Payload>(
      DeviceGroupMembershipApplicationEvent.DeviceGroupMembershipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:deviceGroupMembershipId')
  async findOne(
    @Param('deviceGroupMembershipId') deviceGroupMembershipId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.deviceGroupMembershipDomainFacade.findOneByIdOrFail(
      deviceGroupMembershipId,
      queryOptions,
    )

    return item
  }

  @Patch('/:deviceGroupMembershipId')
  async update(
    @Param('deviceGroupMembershipId') deviceGroupMembershipId: string,
    @Body() body: DeviceGroupMembershipUpdateDto,
  ) {
    const item = await this.deviceGroupMembershipDomainFacade.findOneByIdOrFail(
      deviceGroupMembershipId,
    )

    const itemUpdated = await this.deviceGroupMembershipDomainFacade.update(
      item,
      body as Partial<DeviceGroupMembership>,
    )
    return itemUpdated
  }

  @Delete('/:deviceGroupMembershipId')
  async delete(
    @Param('deviceGroupMembershipId') deviceGroupMembershipId: string,
  ) {
    const item = await this.deviceGroupMembershipDomainFacade.findOneByIdOrFail(
      deviceGroupMembershipId,
    )

    await this.deviceGroupMembershipDomainFacade.delete(item)

    return item
  }
}
