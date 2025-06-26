import { EntitySchema } from 'typeorm'

export const PayerSchema = new EntitySchema({
  name: 'Payer',
  columns: {
    name: {
      name: 'payerName',
      type: 'varchar',
      length: 50,
    },
    email: {
      name: 'payerEmail',
      type: 'varchar',
      length: 100,
      nullable: true,
    },
    taxId: {
      name: 'payerTaxId',
      type: 'varchar',
      length: 20,
      nullable: true,
    },
    mobile: {
      name: 'payerMobile',
      type: 'varchar',
      length: 20,
      nullable: true,
    },
  },
})
