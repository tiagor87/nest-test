import { IHandler } from '../../../shared'
import { SubscriptionItem } from '../entities'
import { Injectable, Scope } from '@nestjs/common'
import { ISubscriptionRepository } from '../repositories'
import { Payer } from '../value-objects'
import { NotFoundError } from '../errors'
import { Subscription } from '../entities'

export interface IUpdateSubscription {
  id: string
  accountId: string
  createdAt: Date
  status: string
  type: string
  selectedPaymentMethod: string
  payer?: Payer | null
  availablePaymentMethods: string
  lastInvoiceId: string
  intervalType: string
  intervalMultiplier: number
  items: SubscriptionItem[]
}
export abstract class IUpdateSubscriptionHandler extends IHandler<
  IUpdateSubscription,
  void
> {}

@Injectable({ scope: Scope.REQUEST })
export class UpdateSubscriptionHandler extends IUpdateSubscriptionHandler {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {
    super()
  }

  async execute(request: IUpdateSubscription): Promise<void> {
    let subscriptionFounded: Subscription | null =
      await this.subscriptionRepository.findById(request.id)
    if (!subscriptionFounded) throw new NotFoundError(request.id)
    await this.mapUpdateSubscriptionToEntity(subscriptionFounded, request)
    subscriptionFounded.validate()
    await this.subscriptionRepository.update(subscriptionFounded)
  }

  private async mapUpdateSubscriptionToEntity(
    subscription: Subscription,
    update: IUpdateSubscription,
  ): Promise<void> {
    subscription.accountId = update.accountId
    subscription.createdAt = update.createdAt
    subscription.status = update.status
    subscription.type = update.type
    subscription.selectedPaymentMethod = update.selectedPaymentMethod
    subscription.payer = update.payer
    subscription.availablePaymentMethods = update.availablePaymentMethods
    subscription.lastInvoiceId = update.lastInvoiceId
    subscription.intervalType = update.intervalType
    subscription.intervalMultiplier = update.intervalMultiplier
    subscription.items = Promise.resolve(update.items)
  }
}
