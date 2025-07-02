import { AggregateRoot, IEvent } from '@nestjs/cqrs'
import { IPayerView, Payer } from '../value-objects/payer.vo'
import {
  ISubscriptionItemView,
  SubscriptionItem,
} from './subscription-item.entity'
import { DomainValidations } from '../validations/domain-validations'
import { v4 } from 'uuid'

export interface ISubscriptionView {
  id: string
  accountId: string
  createdAt: Date
  status: string
  type: string
  selectedPaymentMethod: string
  payer?: IPayerView | null
  availablePaymentMethods: string
  lastInvoiceId: string
  intervalType: string
  intervalMultiplier: number
  items: ISubscriptionItemView[]
}

class SubscriptionView implements ISubscriptionView {
  id: string
  accountId: string
  createdAt: Date
  status: string
  type: string
  selectedPaymentMethod: string
  payer?: IPayerView | null
  availablePaymentMethods: string
  lastInvoiceId: string
  intervalType: string
  intervalMultiplier: number
  items: ISubscriptionItemView[]

  static async create(subscription: Subscription): Promise<ISubscriptionView> {
    const view = new SubscriptionView()
    view.id = subscription.id
    view.accountId = subscription.accountId
    view.createdAt = subscription.createdAt
    view.status = subscription.status
    view.type = subscription.type
    view.selectedPaymentMethod = subscription.selectedPaymentMethod
    view.payer = subscription.payer?.toView()
    view.availablePaymentMethods = subscription.availablePaymentMethods
    view.lastInvoiceId = subscription.lastInvoiceId
    view.intervalType = subscription.intervalType
    view.intervalMultiplier = subscription.intervalMultiplier
    const items = await subscription.items
    view.items = items.map((item) => item.toView())
    return view
  }
}

class SubscriptionCreated implements IEvent {
  constructor(public readonly subscription: Subscription) {}
}

export class Subscription extends AggregateRoot {
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
  items: Promise<SubscriptionItem[]>

  static create(params: {
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
    items: Promise<SubscriptionItem[]>
  }): Subscription {
    const subscription = new Subscription()
    subscription.id = v4()
    subscription.accountId = params.accountId
    subscription.createdAt = params.createdAt
    subscription.status = params.status
    subscription.type = params.type
    subscription.selectedPaymentMethod = params.selectedPaymentMethod
    subscription.payer = params.payer
    subscription.availablePaymentMethods = params.availablePaymentMethods
    subscription.lastInvoiceId = params.lastInvoiceId
    subscription.intervalType = params.intervalType
    subscription.intervalMultiplier = params.intervalMultiplier
    subscription.items = params.items
    subscription.validate()
    subscription.publish(new SubscriptionCreated(subscription))
    return subscription
  }

  validate() {
    const {
      id,
      accountId,
      createdAt,
      status,
      type,
      intervalType,
      intervalMultiplier,
      selectedPaymentMethod,
      availablePaymentMethods,
      lastInvoiceId,
    } = this
    DomainValidations.ValidateNotNull(id, 'id')
    DomainValidations.ValidateNotNull(accountId, 'accountId')
    DomainValidations.ValidateNotNull(createdAt, 'createdAt')
    DomainValidations.ValidateNotNull(status, 'status')
    DomainValidations.ValidateNotNull(type, 'type')
    DomainValidations.ValidateNotNull(intervalType, 'intervalType')
    DomainValidations.ValidateNotNull(intervalMultiplier, 'intervalMultiplier')
    
    DomainValidations.ValidateMaxLength(id, 36, 'id')
    DomainValidations.ValidateMaxLength(accountId, 36, 'accountId')
    DomainValidations.ValidateMaxLength(status, 50, 'status')
    DomainValidations.ValidateMaxLength(type, 50, 'type')
    DomainValidations.ValidateMaxLength(selectedPaymentMethod, 50, 'selectedPaymentMethod')
    DomainValidations.ValidateMaxLength(availablePaymentMethods, 255, 'availablePaymentMethods')
    DomainValidations.ValidateMaxLength(lastInvoiceId, 36, 'lastInvoiceId')
    DomainValidations.ValidateMaxLength(intervalType, 50, 'intervalType')
  }

  toView(): Promise<ISubscriptionView> {
    return SubscriptionView.create(this)
  }
}
