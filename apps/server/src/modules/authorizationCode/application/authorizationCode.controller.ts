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
  AuthorizationCode,
  AuthorizationCodeDomainFacade,
} from '@server/modules/authorizationCode/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AuthorizationCodeApplicationEvent } from './authorizationCode.application.event'
import {
  AuthorizationCodeCreateDto,
  AuthorizationCodeUpdateDto,
} from './authorizationCode.dto'

@Controller('/v1/authorizationCodes')
export class AuthorizationCodeController {
  constructor(
    private eventService: EventService,
    private authorizationCodeDomainFacade: AuthorizationCodeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.authorizationCodeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: AuthorizationCodeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.authorizationCodeDomainFacade.create(body)

    await this.eventService.emit<AuthorizationCodeApplicationEvent.AuthorizationCodeCreated.Payload>(
      AuthorizationCodeApplicationEvent.AuthorizationCodeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:authorizationCodeId')
  async findOne(
    @Param('authorizationCodeId') authorizationCodeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.authorizationCodeDomainFacade.findOneByIdOrFail(
      authorizationCodeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:authorizationCodeId')
  async update(
    @Param('authorizationCodeId') authorizationCodeId: string,
    @Body() body: AuthorizationCodeUpdateDto,
  ) {
    const item =
      await this.authorizationCodeDomainFacade.findOneByIdOrFail(
        authorizationCodeId,
      )

    const itemUpdated = await this.authorizationCodeDomainFacade.update(
      item,
      body as Partial<AuthorizationCode>,
    )
    return itemUpdated
  }

  @Delete('/:authorizationCodeId')
  async delete(@Param('authorizationCodeId') authorizationCodeId: string) {
    const item =
      await this.authorizationCodeDomainFacade.findOneByIdOrFail(
        authorizationCodeId,
      )

    await this.authorizationCodeDomainFacade.delete(item)

    return item
  }
}
