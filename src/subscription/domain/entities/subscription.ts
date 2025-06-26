export class Subscription {
  accountId: string
  createdAt: Date
  status: string
  type: string
  selectedPaymentMethod: string | null
  payer: string | null
  availablePaymentMethods: string[]
  items: string[]
  lastInvoice: string | null
  lastInvoiceId: string | null
  intervalType: string
  intervalMultiplier: number
}
