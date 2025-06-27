import { Payer } from "../value-objects/payer.vo"
import { ISubscriptionItemView, SubscriptionItem } from "./subscription-item.entity"

export interface ISubscriptionView {
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
  items: ISubscriptionItemView[]
}

class SubscriptionView implements ISubscriptionView {
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
  items: ISubscriptionItemView[]

  static async create(subscription: Subscription): Promise<ISubscriptionView> {
    const view = new SubscriptionView()
    view.id = subscription.id
    view.accountId = subscription.accountId
    view.createdAt = subscription.createdAt
    view.status = subscription.status
    view.type = subscription.type
    view.selectedPaymentMethod = subscription.selectedPaymentMethod
    view.payer = subscription.payer
    view.availablePaymentMethods = subscription.availablePaymentMethods
    view.lastInvoiceId = subscription.lastInvoiceId
    view.intervalType = subscription.intervalType
    view.intervalMultiplier = subscription.intervalMultiplier
    const items = await subscription.items
    view.items = items.map((item) => item.toView())
    return view
  }
}

export class Subscription {
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

  toView(): Promise<ISubscriptionView> {
    return SubscriptionView.create(this)
  }
}