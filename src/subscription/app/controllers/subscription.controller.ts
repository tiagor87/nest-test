import { Controller, Get, Query, Scope } from '@nestjs/common'
import { IFindAll, IFindAllHandler } from 'src/subscription/domain'
import { ISubscriptionView } from 'src/subscription/domain/entities/subscription.entity'

@Controller({
  path: 'subscriptions',
  scope: Scope.REQUEST,
})
export class SubscriptionController {
  constructor(
    private readonly handler: IFindAllHandler,
  ) {}

  @Get()
  findAll(@Query() query: IFindAll): Promise<ISubscriptionView[]> {
    return this.handler.execute(query)
  }
}
