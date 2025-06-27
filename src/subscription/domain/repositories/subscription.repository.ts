import { Subscription } from '../entities/subscription.entity'

export abstract class ISubscriptionRepository {
  abstract findAll(): Promise<Subscription[]>
}