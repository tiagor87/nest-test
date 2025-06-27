import { EntitySchema } from 'typeorm'
import { Payer } from 'src/subscription/domain'

export const PayerSchema = new EntitySchema<Payer>({
  name: 'Payer',
  target: Payer,
  columns: {
    name: {
      type: 'varchar',
      length: 50,
    },
    email: {
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    taxId: {
      type: 'varchar',
      length: 20,
      nullable: true,
    },
    mobile: {
      type: 'varchar',
      length: 20,
      nullable: true,
    },
  },
})