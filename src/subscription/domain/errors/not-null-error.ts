import { DomainError } from './domain-error'

export class NotNullError extends DomainError {
  constructor(fieldName: string) {
    super(`${fieldName} is required`, 'NOT_NULL')
  }
}
