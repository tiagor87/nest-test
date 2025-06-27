import { SubscriptionItem } from 'src/subscription/domain/entities/subscription-item.entity'
import { Subscription } from 'src/subscription/domain/entities/subscription.entity'
import { EntitySchema } from 'typeorm'

export const SubscriptionItemSchema = new EntitySchema<SubscriptionItem>({
  name: 'SubscriptionItem',
  target: SubscriptionItem,
  columns: {
    id: {
      type: 'varchar',
      length: 36,
      primary: true,
    },
    subscriptionId: {
      type: 'varchar',
      length: 36,
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    price: {
      type: 'bigint',
    },
    currency: {
      type: 'varchar',
      length: 3,
    },
    createdAt: {
      type: 'timestamp',
    },
    startAt: {
      type: 'timestamp',
    },
    endAt: {
      type: 'timestamp',
      nullable: true,
    },
    deletedAt: {
      type: 'timestamp',
      nullable: true,
    },
  },
  relations: {
    subscription: {
      type: 'many-to-one',
      target: () => Subscription,
      joinColumn: { name: 'subscriptionId', referencedColumnName: 'id' },
      eager: true,
    },
  },
})