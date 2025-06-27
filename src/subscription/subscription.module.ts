import { Module } from '@nestjs/common'
import { SubscriptionController } from './app/controllers/subscription.controller'
import { ISubscriptionRepository } from './domain/repositories/subscription.repository'
import { SubscriptionRepository } from './infra/repositories/subscription.repository'

@Module({
  controllers: [SubscriptionController],
  providers: [
    {
      provide: ISubscriptionRepository,
      useClass: SubscriptionRepository,
    },
  ],
})
export class SubscriptionModule {}
