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
import { Shot, ShotDomainFacade } from '@server/modules/shot/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ShotApplicationEvent } from './shot.application.event'
import { ShotCreateDto, ShotUpdateDto } from './shot.dto'

@Controller('/v1/shots')
export class ShotController {
  constructor(
    private eventService: EventService,
    private shotDomainFacade: ShotDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.shotDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ShotCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.shotDomainFacade.create(body)

    await this.eventService.emit<ShotApplicationEvent.ShotCreated.Payload>(
      ShotApplicationEvent.ShotCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:shotId')
  async findOne(@Param('shotId') shotId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.shotDomainFacade.findOneByIdOrFail(
      shotId,
      queryOptions,
    )

    return item
  }

  @Patch('/:shotId')
  async update(@Param('shotId') shotId: string, @Body() body: ShotUpdateDto) {
    const item = await this.shotDomainFacade.findOneByIdOrFail(shotId)

    const itemUpdated = await this.shotDomainFacade.update(
      item,
      body as Partial<Shot>,
    )
    return itemUpdated
  }

  @Delete('/:shotId')
  async delete(@Param('shotId') shotId: string) {
    const item = await this.shotDomainFacade.findOneByIdOrFail(shotId)

    await this.shotDomainFacade.delete(item)

    return item
  }
}
