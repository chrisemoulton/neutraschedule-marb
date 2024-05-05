import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AuthorizationCodeDomainFacade } from '@server/modules/authorizationCode/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AuthorizationCodeApplicationEvent } from './authorizationCode.application.event'
import { AuthorizationCodeCreateDto } from './authorizationCode.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AuthorizationCodeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private authorizationCodeDomainFacade: AuthorizationCodeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/authorizationCodes')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.authorizationCodeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/authorizationCodes')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AuthorizationCodeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.authorizationCodeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AuthorizationCodeApplicationEvent.AuthorizationCodeCreated.Payload>(
      AuthorizationCodeApplicationEvent.AuthorizationCodeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
