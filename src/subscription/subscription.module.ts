import { Module } from '@nestjs/common'
import { SubscriptionController } from './app'
import { ISubscriptionRepository } from './domain'
import { SubscriptionRepository } from './infra'
import { IFindAllHandler, FindAllHandler, IGetSubscriptionHandler, GetSubscriptionHandler } from './domain'
import { IUpdateSubscriptionHandler, UpdateSubscriptionHandler } from './domain/commands/update-subscription.handler'
import { CreateSubscriptionHandler, ICreateSubscriptionHandler } from './domain/commands/create-subscription.handler'

@Module({
  controllers: [SubscriptionController],
  providers: [
    {
      provide: ISubscriptionRepository,
      useClass: SubscriptionRepository,
    },
    {
      provide: IFindAllHandler,
      useClass: FindAllHandler,
    },
    {
      provide: IGetSubscriptionHandler,
      useClass: GetSubscriptionHandler,
    },
    {
      provide: IUpdateSubscriptionHandler,
      useClass: UpdateSubscriptionHandler,
    },
    {
      provide: ICreateSubscriptionHandler,
      useClass: CreateSubscriptionHandler,
    },
  ],
})
export class SubscriptionModule {}
