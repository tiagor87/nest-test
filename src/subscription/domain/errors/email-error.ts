import { DomainError } from './domain-error'

export class EmailError extends DomainError {
  constructor(email: string) {
    super(`This ${email} is invalid.`, 'EMAIL_ERROR')
  }
}
