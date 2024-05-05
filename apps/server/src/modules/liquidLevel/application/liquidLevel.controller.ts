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
  LiquidLevel,
  LiquidLevelDomainFacade,
} from '@server/modules/liquidLevel/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LiquidLevelApplicationEvent } from './liquidLevel.application.event'
import { LiquidLevelCreateDto, LiquidLevelUpdateDto } from './liquidLevel.dto'

@Controller('/v1/liquidLevels')
export class LiquidLevelController {
  constructor(
    private eventService: EventService,
    private liquidLevelDomainFacade: LiquidLevelDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.liquidLevelDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LiquidLevelCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.liquidLevelDomainFacade.create(body)

    await this.eventService.emit<LiquidLevelApplicationEvent.LiquidLevelCreated.Payload>(
      LiquidLevelApplicationEvent.LiquidLevelCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:liquidLevelId')
  async findOne(
    @Param('liquidLevelId') liquidLevelId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.liquidLevelDomainFacade.findOneByIdOrFail(
      liquidLevelId,
      queryOptions,
    )

    return item
  }

  @Patch('/:liquidLevelId')
  async update(
    @Param('liquidLevelId') liquidLevelId: string,
    @Body() body: LiquidLevelUpdateDto,
  ) {
    const item =
      await this.liquidLevelDomainFacade.findOneByIdOrFail(liquidLevelId)

    const itemUpdated = await this.liquidLevelDomainFacade.update(
      item,
      body as Partial<LiquidLevel>,
    )
    return itemUpdated
  }

  @Delete('/:liquidLevelId')
  async delete(@Param('liquidLevelId') liquidLevelId: string) {
    const item =
      await this.liquidLevelDomainFacade.findOneByIdOrFail(liquidLevelId)

    await this.liquidLevelDomainFacade.delete(item)

    return item
  }
}
