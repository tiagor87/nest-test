import { Module } from '@nestjs/common'
import { SubscriptionController } from './app/controllers/subscription.controller'
import { ISubscriptionRepository } from './domain/repositories/subscription.repository'
import { SubscriptionRepository } from './infra/repositories/subscription.repository'
import { IFindAllHandler, FindAllHandler } from './domain'

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
  ],
})
export class SubscriptionModule {}
