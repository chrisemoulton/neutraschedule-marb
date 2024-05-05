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
import { Role, RoleDomainFacade } from '@server/modules/role/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { RoleApplicationEvent } from './role.application.event'
import { RoleCreateDto, RoleUpdateDto } from './role.dto'

@Controller('/v1/roles')
export class RoleController {
  constructor(
    private eventService: EventService,
    private roleDomainFacade: RoleDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.roleDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: RoleCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.roleDomainFacade.create(body)

    await this.eventService.emit<RoleApplicationEvent.RoleCreated.Payload>(
      RoleApplicationEvent.RoleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:roleId')
  async findOne(@Param('roleId') roleId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.roleDomainFacade.findOneByIdOrFail(
      roleId,
      queryOptions,
    )

    return item
  }

  @Patch('/:roleId')
  async update(@Param('roleId') roleId: string, @Body() body: RoleUpdateDto) {
    const item = await this.roleDomainFacade.findOneByIdOrFail(roleId)

    const itemUpdated = await this.roleDomainFacade.update(
      item,
      body as Partial<Role>,
    )
    return itemUpdated
  }

  @Delete('/:roleId')
  async delete(@Param('roleId') roleId: string) {
    const item = await this.roleDomainFacade.findOneByIdOrFail(roleId)

    await this.roleDomainFacade.delete(item)

    return item
  }
}
