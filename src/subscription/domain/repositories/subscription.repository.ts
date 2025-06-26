import { Subscription } from '../entities/subscription'

export const SUBSCRIPTION_REPOSITORY_TYPE = 'SubscriptionRepository'

export interface ISubscriptionRepository {
  findAll(): Promise<Subscription[]>
}
