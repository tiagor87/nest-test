import { Subscription } from "./subscription.entity"

export interface ISubscriptionItemView {
  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date
  deletedAt: Date
}

class SubscriptionItemView implements ISubscriptionItemView {
  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date
  deletedAt: Date

  static create(subscriptionItem: SubscriptionItem): ISubscriptionItemView {
    const view = new SubscriptionItemView()
    view.id = subscriptionItem.id
    view.subscriptionId = subscriptionItem.subscriptionId
    view.name = subscriptionItem.name
    view.price = subscriptionItem.price
    view.currency = subscriptionItem.currency
    view.createdAt = subscriptionItem.createdAt
    view.startAt = subscriptionItem.startAt
    view.endAt = subscriptionItem.endAt
    view.deletedAt = subscriptionItem.deletedAt
    return view
  }
}

export class SubscriptionItem {
  subscription: Subscription

  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date
  deletedAt: Date

  toView(): ISubscriptionItemView {
    return SubscriptionItemView.create(this)
  }
}