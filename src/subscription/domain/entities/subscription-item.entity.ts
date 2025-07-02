import { Subscription } from './subscription.entity'
import { DomainValidations } from '../validations/domain-validations'
import { v4 } from 'uuid'

export interface ISubscriptionItemView {
  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date | null
  deletedAt: Date | null
}

class SubscriptionItemView implements ISubscriptionItemView {
  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date | null
  deletedAt: Date | null

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
  subscription: Subscription | null

  id: string
  subscriptionId: string
  name: string
  price: number
  currency: string
  createdAt: Date
  startAt: Date
  endAt: Date | null
  deletedAt: Date | null

  static create(params: {
    subscriptionId: string
    name: string
    price: number
    currency: string
    createdAt: Date
  }): SubscriptionItem {
    const item = new SubscriptionItem()
    item.id = v4()
    item.subscriptionId = params.subscriptionId
    item.name = params.name
    item.price = params.price
    item.currency = params.currency
    item.createdAt = params.createdAt
    item.startAt = new Date()
    item.validate()
    return item
  }

  validate() {
    DomainValidations.ValidateNotNull(this.id, 'id')
    DomainValidations.ValidateNotNull(this.subscriptionId, 'subscriptionId')
    DomainValidations.ValidateNotNull(this.name, 'name')
    DomainValidations.ValidateNotNull(this.price, 'price')
    DomainValidations.ValidateNotNull(this.currency, 'currency')
    DomainValidations.ValidateNotNull(this.createdAt, 'createdAt')
    DomainValidations.ValidateNotNull(this.startAt, 'startAt')
  }

  toView(): ISubscriptionItemView {
    return SubscriptionItemView.create(this)
  }
}
