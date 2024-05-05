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
  DataPoint,
  DataPointDomainFacade,
} from '@server/modules/dataPoint/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DataPointApplicationEvent } from './dataPoint.application.event'
import { DataPointCreateDto, DataPointUpdateDto } from './dataPoint.dto'

@Controller('/v1/dataPoints')
export class DataPointController {
  constructor(
    private eventService: EventService,
    private dataPointDomainFacade: DataPointDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.dataPointDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DataPointCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.dataPointDomainFacade.create(body)

    await this.eventService.emit<DataPointApplicationEvent.DataPointCreated.Payload>(
      DataPointApplicationEvent.DataPointCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:dataPointId')
  async findOne(
    @Param('dataPointId') dataPointId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.dataPointDomainFacade.findOneByIdOrFail(
      dataPointId,
      queryOptions,
    )

    return item
  }

  @Patch('/:dataPointId')
  async update(
    @Param('dataPointId') dataPointId: string,
    @Body() body: DataPointUpdateDto,
  ) {
    const item = await this.dataPointDomainFacade.findOneByIdOrFail(dataPointId)

    const itemUpdated = await this.dataPointDomainFacade.update(
      item,
      body as Partial<DataPoint>,
    )
    return itemUpdated
  }

  @Delete('/:dataPointId')
  async delete(@Param('dataPointId') dataPointId: string) {
    const item = await this.dataPointDomainFacade.findOneByIdOrFail(dataPointId)

    await this.dataPointDomainFacade.delete(item)

    return item
  }
}
