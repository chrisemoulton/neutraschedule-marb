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
import { Strain, StrainDomainFacade } from '@server/modules/strain/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StrainApplicationEvent } from './strain.application.event'
import { StrainCreateDto, StrainUpdateDto } from './strain.dto'

@Controller('/v1/strains')
export class StrainController {
  constructor(
    private eventService: EventService,
    private strainDomainFacade: StrainDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.strainDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StrainCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.strainDomainFacade.create(body)

    await this.eventService.emit<StrainApplicationEvent.StrainCreated.Payload>(
      StrainApplicationEvent.StrainCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:strainId')
  async findOne(@Param('strainId') strainId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.strainDomainFacade.findOneByIdOrFail(
      strainId,
      queryOptions,
    )

    return item
  }

  @Patch('/:strainId')
  async update(
    @Param('strainId') strainId: string,
    @Body() body: StrainUpdateDto,
  ) {
    const item = await this.strainDomainFacade.findOneByIdOrFail(strainId)

    const itemUpdated = await this.strainDomainFacade.update(
      item,
      body as Partial<Strain>,
    )
    return itemUpdated
  }

  @Delete('/:strainId')
  async delete(@Param('strainId') strainId: string) {
    const item = await this.strainDomainFacade.findOneByIdOrFail(strainId)

    await this.strainDomainFacade.delete(item)

    return item
  }
}
