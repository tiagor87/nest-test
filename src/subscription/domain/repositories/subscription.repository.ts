import { Subscription } from '../entities'

export abstract class ISubscriptionRepository {
  abstract findAll(): Promise<Subscription[]>
  abstract findById(id: string): Promise<Subscription | null>
  abstract update(subscription: Subscription): Promise<void>
  abstract create(subscription: Subscription): Promise<void>
}
