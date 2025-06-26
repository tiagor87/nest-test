import { Module } from '@nestjs/common'
import { SubscriptionController } from './app/controllers/subscription.controller'
import { SUBSCRIPTION_REPOSITORY_TYPE } from './domain/repositories/subscription.repository'
import { SubscriptionRepository } from './infra/repositories/subscription.repository'

@Module({
  controllers: [SubscriptionController],
  providers: [
    {
      provide: SUBSCRIPTION_REPOSITORY_TYPE,
      useClass: SubscriptionRepository,
    },
  ],
})
export class SubscriptionModule {}
