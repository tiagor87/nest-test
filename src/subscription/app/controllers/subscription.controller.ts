import { Controller, Get, Query } from '@nestjs/common'
import { QueryDto } from '../dtos/query-dto'
import { ISubscriptionRepository } from 'src/subscription/domain/repositories/subscription.repository'
import { ISubscriptionView } from 'src/subscription/domain/entities/subscription.entity'



@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<ISubscriptionView[]> {
    console.log(query)
    const subscriptions = await this.subscriptionRepository.findAll()
    return await Promise.all(subscriptions.map((subscription) => subscription.toView()))
  }
}
