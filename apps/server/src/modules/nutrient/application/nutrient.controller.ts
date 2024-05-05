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
import { Nutrient, NutrientDomainFacade } from '@server/modules/nutrient/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { NutrientApplicationEvent } from './nutrient.application.event'
import { NutrientCreateDto, NutrientUpdateDto } from './nutrient.dto'

@Controller('/v1/nutrients')
export class NutrientController {
  constructor(
    private eventService: EventService,
    private nutrientDomainFacade: NutrientDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.nutrientDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: NutrientCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.nutrientDomainFacade.create(body)

    await this.eventService.emit<NutrientApplicationEvent.NutrientCreated.Payload>(
      NutrientApplicationEvent.NutrientCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:nutrientId')
  async findOne(
    @Param('nutrientId') nutrientId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.nutrientDomainFacade.findOneByIdOrFail(
      nutrientId,
      queryOptions,
    )

    return item
  }

  @Patch('/:nutrientId')
  async update(
    @Param('nutrientId') nutrientId: string,
    @Body() body: NutrientUpdateDto,
  ) {
    const item = await this.nutrientDomainFacade.findOneByIdOrFail(nutrientId)

    const itemUpdated = await this.nutrientDomainFacade.update(
      item,
      body as Partial<Nutrient>,
    )
    return itemUpdated
  }

  @Delete('/:nutrientId')
  async delete(@Param('nutrientId') nutrientId: string) {
    const item = await this.nutrientDomainFacade.findOneByIdOrFail(nutrientId)

    await this.nutrientDomainFacade.delete(item)

    return item
  }
}
