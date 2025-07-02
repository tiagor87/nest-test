import { DomainError } from './domain-error'

export class SizeError extends DomainError {
  constructor(fieldName: string, message: string) {
    super(`${fieldName} ${message}`, 'SIZE')
    this.name = 'SizeError'
  }
}
