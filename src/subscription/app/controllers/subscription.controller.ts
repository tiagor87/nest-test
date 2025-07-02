import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Scope,
} from '@nestjs/common'
import {
  IFindAll,
  IFindAllHandler,
  IGetSubscriptionById,
  IGetSubscriptionHandler,
} from 'src/subscription/domain'
import { ISubscriptionView } from 'src/subscription/domain/entities/subscription.entity'
import {
  ICreateSubscription,
  ICreateSubscriptionHandler,
} from '../../domain/commands/create-subscription.handler'
import {
  IUpdateSubscription,
  IUpdateSubscriptionHandler,
} from '../../domain/commands/update-subscription.handler'

@Controller({
  path: 'subscriptions',
  scope: Scope.REQUEST,
})
export class SubscriptionController {
  constructor(
    private readonly allHandler: IFindAllHandler,
    private readonly getByIdHandler: IGetSubscriptionHandler,
    private readonly createSubscriptionHandler: ICreateSubscriptionHandler,
    private readonly updateSubscriptionHandler: IUpdateSubscriptionHandler,
  ) {}

  @Get()
  findAll(@Query() query: IFindAll): Promise<ISubscriptionView[]> {
    return this.allHandler.execute(query)
  }

  @Get()
  async getById(
    @Query() query: IGetSubscriptionById,
  ): Promise<ISubscriptionView> {
    return await this.getByIdHandler.execute(query)
  }

  @Post()
  async createSubscription(
    @Body() query: ICreateSubscription,
  ): Promise<string> {
    return await this.createSubscriptionHandler.execute(query)
  }

  @Put()
  async updateSubscription(
    @Body() query: IUpdateSubscription,
  ): Promise<HttpStatus> {
    await this.updateSubscriptionHandler.execute(query)
    return HttpStatus.OK
  }
}
