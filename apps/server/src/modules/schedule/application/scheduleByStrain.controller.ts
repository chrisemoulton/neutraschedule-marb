import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ScheduleDomainFacade } from '@server/modules/schedule/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ScheduleApplicationEvent } from './schedule.application.event'
import { ScheduleCreateDto } from './schedule.dto'

import { StrainDomainFacade } from '../../strain/domain'

@Controller('/v1/strains')
export class ScheduleByStrainController {
  constructor(
    private strainDomainFacade: StrainDomainFacade,

    private scheduleDomainFacade: ScheduleDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/strain/:strainId/schedules')
  async findManyStrainId(
    @Param('strainId') strainId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.strainDomainFacade.findOneByIdOrFail(strainId)

    const items = await this.scheduleDomainFacade.findManyByStrain(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/strain/:strainId/schedules')
  async createByStrainId(
    @Param('strainId') strainId: string,
    @Body() body: ScheduleCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, strainId }

    const item = await this.scheduleDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ScheduleApplicationEvent.ScheduleCreated.Payload>(
      ScheduleApplicationEvent.ScheduleCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
