import { IHandler } from '../../../shared'
import { Injectable, Scope } from '@nestjs/common'
import { ISubscriptionRepository } from '../repositories'
import { Payer } from '../value-objects'
import { Subscription, SubscriptionItem } from '../entities'

export interface ICreateSubscription {
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
  items: Promise<ICreateSubscriptionItem[]>
}
export interface ICreateSubscriptionItem {
  id: string
  name: string
  price: number
  currency: string
  createdAt: Date
}
export abstract class ICreateSubscriptionHandler extends IHandler<
  ICreateSubscription,
  string
> {}

@Injectable({ scope: Scope.REQUEST })
export class CreateSubscriptionHandler extends ICreateSubscriptionHandler {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {
    super()
  }

  async execute(request: ICreateSubscription): Promise<string> {
    const subscription = this.mapICreateSubscriptionToSubscription(request)
    await this.subscriptionRepository.create(subscription)
    return subscription.id
  }
  private mapICreateSubscriptionToSubscription(
    input: ICreateSubscription,
  ): Subscription {
    const subscription = Subscription.create({
      accountId: input.accountId,
      createdAt: input.createdAt,
      status: input.status,
      type: input.type,
      selectedPaymentMethod: input.selectedPaymentMethod,
      payer: input.payer,
      availablePaymentMethods: input.availablePaymentMethods,
      lastInvoiceId: input.lastInvoiceId,
      intervalType: input.intervalType,
      intervalMultiplier: input.intervalMultiplier,
      items: Promise.resolve([]),
    })
    subscription.items = Promise.resolve(input.items).then((items) =>
      items.map((item) =>
        SubscriptionItem.create({
          subscriptionId: subscription.id,
          name: item.name,
          price: item.price,
          currency: item.currency,
          createdAt: item.createdAt,
        }),
      ),
    )
    return subscription
  }
}
