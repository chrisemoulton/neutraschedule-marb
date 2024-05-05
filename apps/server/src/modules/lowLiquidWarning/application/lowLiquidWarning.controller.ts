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
  LowLiquidWarning,
  LowLiquidWarningDomainFacade,
} from '@server/modules/lowLiquidWarning/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LowLiquidWarningApplicationEvent } from './lowLiquidWarning.application.event'
import {
  LowLiquidWarningCreateDto,
  LowLiquidWarningUpdateDto,
} from './lowLiquidWarning.dto'

@Controller('/v1/lowLiquidWarnings')
export class LowLiquidWarningController {
  constructor(
    private eventService: EventService,
    private lowLiquidWarningDomainFacade: LowLiquidWarningDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.lowLiquidWarningDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: LowLiquidWarningCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.lowLiquidWarningDomainFacade.create(body)

    await this.eventService.emit<LowLiquidWarningApplicationEvent.LowLiquidWarningCreated.Payload>(
      LowLiquidWarningApplicationEvent.LowLiquidWarningCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:lowLiquidWarningId')
  async findOne(
    @Param('lowLiquidWarningId') lowLiquidWarningId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.lowLiquidWarningDomainFacade.findOneByIdOrFail(
      lowLiquidWarningId,
      queryOptions,
    )

    return item
  }

  @Patch('/:lowLiquidWarningId')
  async update(
    @Param('lowLiquidWarningId') lowLiquidWarningId: string,
    @Body() body: LowLiquidWarningUpdateDto,
  ) {
    const item =
      await this.lowLiquidWarningDomainFacade.findOneByIdOrFail(
        lowLiquidWarningId,
      )

    const itemUpdated = await this.lowLiquidWarningDomainFacade.update(
      item,
      body as Partial<LowLiquidWarning>,
    )
    return itemUpdated
  }

  @Delete('/:lowLiquidWarningId')
  async delete(@Param('lowLiquidWarningId') lowLiquidWarningId: string) {
    const item =
      await this.lowLiquidWarningDomainFacade.findOneByIdOrFail(
        lowLiquidWarningId,
      )

    await this.lowLiquidWarningDomainFacade.delete(item)

    return item
  }
}
