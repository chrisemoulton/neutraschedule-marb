import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LowLiquidWarningDomainFacade } from '@server/modules/lowLiquidWarning/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LowLiquidWarningApplicationEvent } from './lowLiquidWarning.application.event'
import { LowLiquidWarningCreateDto } from './lowLiquidWarning.dto'

import { LiquidLevelDomainFacade } from '../../liquidLevel/domain'

@Controller('/v1/liquidLevels')
export class LowLiquidWarningByLiquidLevelController {
  constructor(
    private liquidLevelDomainFacade: LiquidLevelDomainFacade,

    private lowLiquidWarningDomainFacade: LowLiquidWarningDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/level/:levelId/lowLiquidWarnings')
  async findManyLevelId(
    @Param('levelId') levelId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.liquidLevelDomainFacade.findOneByIdOrFail(levelId)

    const items = await this.lowLiquidWarningDomainFacade.findManyByLevel(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/level/:levelId/lowLiquidWarnings')
  async createByLevelId(
    @Param('levelId') levelId: string,
    @Body() body: LowLiquidWarningCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, levelId }

    const item = await this.lowLiquidWarningDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LowLiquidWarningApplicationEvent.LowLiquidWarningCreated.Payload>(
      LowLiquidWarningApplicationEvent.LowLiquidWarningCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
