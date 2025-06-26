import { Injectable, Scope } from '@nestjs/common'
import { Subscription } from 'src/subscription/domain/entities/subscription'
import { ISubscriptionRepository } from 'src/subscription/domain/repositories/subscription.repository'
import { DataSource } from 'typeorm'

@Injectable({
  scope: Scope.REQUEST,
})
export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly dataSource: DataSource) {}
  findAll(): Promise<Subscription[]> {
    return this.dataSource.manager.find(Subscription)
  }
}
