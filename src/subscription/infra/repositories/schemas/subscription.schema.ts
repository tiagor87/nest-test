import { Subscription } from '../../../domain/entities/subscription'
import { EntitySchema } from 'typeorm'
import { PayerSchema } from './payer.schema'

export const SubscriptionSchema = new EntitySchema<Subscription>({
  target: Subscription,
  name: 'Subscription',
  columns: {
    accountId: {
      type: 'varchar',
      length: 36,
      primary: true,
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
})
