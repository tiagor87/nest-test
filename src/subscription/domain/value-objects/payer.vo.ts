export interface IPayerView {
  name: string
  email: string
  taxId: string
  mobile: string
}

export class PayerView implements IPayerView {
  name: string
  email: string
  taxId: string
  mobile: string

  static create(payer: Payer): IPayerView | null {
    if (PayerView.isEmpty(payer)) {
      return null
    }

    const view = new PayerView()
    view.name = payer.name
    view.email = payer.email
    view.taxId = payer.taxId
    view.mobile = payer.mobile
    return view
  }

  private static isEmpty(payer: Payer): boolean {
    return !payer.name && !payer.email && !payer.taxId && !payer.mobile
  }
}

export class Payer {
  name: string
  email: string
  taxId: string
  mobile: string

  toView(): IPayerView | null {
    return PayerView.create(this)
  }
}