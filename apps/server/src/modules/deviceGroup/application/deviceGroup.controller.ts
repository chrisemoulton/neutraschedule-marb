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
  DeviceGroup,
  DeviceGroupDomainFacade,
} from '@server/modules/deviceGroup/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DeviceGroupApplicationEvent } from './deviceGroup.application.event'
import { DeviceGroupCreateDto, DeviceGroupUpdateDto } from './deviceGroup.dto'

@Controller('/v1/deviceGroups')
export class DeviceGroupController {
  constructor(
    private eventService: EventService,
    private deviceGroupDomainFacade: DeviceGroupDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.deviceGroupDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DeviceGroupCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.deviceGroupDomainFacade.create(body)

    await this.eventService.emit<DeviceGroupApplicationEvent.DeviceGroupCreated.Payload>(
      DeviceGroupApplicationEvent.DeviceGroupCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:deviceGroupId')
  async findOne(
    @Param('deviceGroupId') deviceGroupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.deviceGroupDomainFacade.findOneByIdOrFail(
      deviceGroupId,
      queryOptions,
    )

    return item
  }

  @Patch('/:deviceGroupId')
  async update(
    @Param('deviceGroupId') deviceGroupId: string,
    @Body() body: DeviceGroupUpdateDto,
  ) {
    const item =
      await this.deviceGroupDomainFacade.findOneByIdOrFail(deviceGroupId)

    const itemUpdated = await this.deviceGroupDomainFacade.update(
      item,
      body as Partial<DeviceGroup>,
    )
    return itemUpdated
  }

  @Delete('/:deviceGroupId')
  async delete(@Param('deviceGroupId') deviceGroupId: string) {
    const item =
      await this.deviceGroupDomainFacade.findOneByIdOrFail(deviceGroupId)

    await this.deviceGroupDomainFacade.delete(item)

    return item
  }
}
