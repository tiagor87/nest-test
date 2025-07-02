import { NotNullError } from '../errors/not-null-error'
import { EmailError } from '../errors/email-error'

export class DomainValidations {
  static ValidateEmail(email: string) {
    if (!email) throw new NotNullError('Email')
    if (!/\S+@\S+\.\S+/.test(email)) throw new EmailError(email)
  }

  static ValidateNotNull<T>(value: T, fieldName: string) {
    if (value === null || value === undefined) {
      throw new NotNullError(fieldName)
    }
  }
}
