import { Controller, Get, Inject, Query } from '@nestjs/common'
import { QueryDto } from '../dtos/query-dto'
import {
  ISubscriptionRepository,
  SUBSCRIPTION_REPOSITORY_TYPE,
} from 'src/subscription/domain/repositories/subscription.repository'
import { Subscription } from 'src/subscription/domain/entities/subscription'

@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY_TYPE)
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}
  @Get()
  findAll(@Query() query: QueryDto): Promise<Subscription[]> {
    return this.subscriptionRepository.findAll()
  }
}
