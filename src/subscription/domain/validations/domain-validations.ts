import { NotNullError } from '../errors/not-null-error'
import { EmailError } from '../errors/email-error'
import { SizeError } from '../errors/size-error'

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

  static ValidateMinLength(value: string, min: number, fieldName: string) {
    if (value == null || value.length < min) {
      throw new SizeError(fieldName, `must be at least ${min} characters long`)
    }
  }

  static ValidateMaxLength(value: string, max: number, fieldName: string) {
    if (value != null && value.length > max) {
      throw new SizeError(fieldName, `must be at most ${max} characters long`)
    }
  }

  static ValidateLengthRange(value: string, min: number, max: number, fieldName: string) {
    if (value == null || value.length < min || value.length > max) {
      throw new SizeError(fieldName, `must be between ${min} and ${max} characters long`)
    }
  }
}
