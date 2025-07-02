import { DomainError } from './domain-error'

export class NotFoundError extends DomainError {
  constructor(property: string) {
    super(`Not found with.`, 'NOT_FOUND')
  }
}
