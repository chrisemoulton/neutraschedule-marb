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
  EnvironmentalCondition,
  EnvironmentalConditionDomainFacade,
} from '@server/modules/environmentalCondition/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EnvironmentalConditionApplicationEvent } from './environmentalCondition.application.event'
import {
  EnvironmentalConditionCreateDto,
  EnvironmentalConditionUpdateDto,
} from './environmentalCondition.dto'

@Controller('/v1/environmentalConditions')
export class EnvironmentalConditionController {
  constructor(
    private eventService: EventService,
    private environmentalConditionDomainFacade: EnvironmentalConditionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.environmentalConditionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: EnvironmentalConditionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.environmentalConditionDomainFacade.create(body)

    await this.eventService.emit<EnvironmentalConditionApplicationEvent.EnvironmentalConditionCreated.Payload>(
      EnvironmentalConditionApplicationEvent.EnvironmentalConditionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:environmentalConditionId')
  async findOne(
    @Param('environmentalConditionId') environmentalConditionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item =
      await this.environmentalConditionDomainFacade.findOneByIdOrFail(
        environmentalConditionId,
        queryOptions,
      )

    return item
  }

  @Patch('/:environmentalConditionId')
  async update(
    @Param('environmentalConditionId') environmentalConditionId: string,
    @Body() body: EnvironmentalConditionUpdateDto,
  ) {
    const item =
      await this.environmentalConditionDomainFacade.findOneByIdOrFail(
        environmentalConditionId,
      )

    const itemUpdated = await this.environmentalConditionDomainFacade.update(
      item,
      body as Partial<EnvironmentalCondition>,
    )
    return itemUpdated
  }

  @Delete('/:environmentalConditionId')
  async delete(
    @Param('environmentalConditionId') environmentalConditionId: string,
  ) {
    const item =
      await this.environmentalConditionDomainFacade.findOneByIdOrFail(
        environmentalConditionId,
      )

    await this.environmentalConditionDomainFacade.delete(item)

    return item
  }
}
