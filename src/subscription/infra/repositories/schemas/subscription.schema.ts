import { Subscription } from 'src/subscription/domain'
import { SubscriptionItem } from 'src/subscription/domain/entities/subscription-item.entity'
import { EntitySchema } from 'typeorm'
import { PayerSchema } from './payer.vo-schema'

export const SubscriptionSchema = new EntitySchema<Subscription>({
  target: Subscription,
  name: 'Subscription',
  columns: {
    id: {
      type: 'varchar',
      length: 36,
      primary: true,
    },
    accountId: {
      type: 'varchar',
      length: 36,
    },
    createdAt: {
      type: 'timestamp',
    },
    status: {
      type: 'varchar',
      length: 50,
    },
    type: {
      type: 'varchar',
      length: 50,
    },
    selectedPaymentMethod: {
      type: 'varchar',
      length: 50,
      nullable: true,
    },
    availablePaymentMethods: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    lastInvoiceId: {
      type: 'varchar',
      length: 36,
      nullable: true,
    },
    intervalType: {
      type: 'varchar',
      length: 50,
    },
    intervalMultiplier: {
      type: 'int',
    },
  },
  embeddeds: {
    payer: {
      schema: PayerSchema,
    },
  },
  relations: {
    items: {
      type: 'one-to-many',
      target: () => SubscriptionItem,
      inverseSide: 'subscription',
      lazy: true,
    },
  },
})
