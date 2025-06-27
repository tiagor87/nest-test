import { Injectable, Scope } from '@nestjs/common'
import { Subscription } from 'src/subscription/domain/entities/subscription.entity'
import { ISubscriptionRepository } from 'src/subscription/domain/repositories/subscription.repository'
import { DataSource } from 'typeorm'

@Injectable({
  scope: Scope.REQUEST,
})
export class SubscriptionRepository extends ISubscriptionRepository {
  constructor(private readonly dataSource: DataSource) {
    super()
  }
  findAll(): Promise<Subscription[]> {
    return this.dataSource.manager.find(Subscription)
  }
}
