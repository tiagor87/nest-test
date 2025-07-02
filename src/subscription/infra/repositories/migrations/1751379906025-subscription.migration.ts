import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Subscription1751379906025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Subscription',
        columns: [
          { name: 'id', type: 'varchar', length: '36', isPrimary: true },
          { name: 'accountId', type: 'varchar', length: '36' },
          { name: 'createdAt', type: 'timestamp' },
          { name: 'status', type: 'varchar', length: '50' },
          { name: 'type', type: 'varchar', length: '50' },
          { name: 'selectedPaymentMethod', type: 'varchar', length: '50', isNullable: true },
          { name: 'availablePaymentMethods', type: 'varchar', length: '255', isNullable: true },
          { name: 'lastInvoiceId', type: 'varchar', length: '36', isNullable: true },
          { name: 'intervalType', type: 'varchar', length: '50' },
          { name: 'intervalMultiplier', type: 'int' },
          { name: 'payerName', type: 'varchar', length: '50',isNullable: true },
          { name: 'payerEmail', type: 'varchar', length: '100', isNullable: true },
          { name: 'payerTaxId', type: 'varchar', length: '20', isNullable: true },
          { name: 'payerMobile', type: 'varchar', length: '20', isNullable: true },
        ],
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'SubscriptionItem',
        columns: [
          { name: 'id', type: 'varchar', length: '36', isPrimary: true },
          { name: 'subscriptionId', type: 'varchar', length: '36' },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'price', type: 'bigint' },
          { name: 'currency', type: 'varchar', length: '3' },
          { name: 'createdAt', type: 'timestamp' },
          { name: 'startAt', type: 'timestamp' },
          { name: 'endAt', type: 'timestamp', isNullable: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
        foreignKeys: [
          {
            columnNames: ['subscriptionId'],
            referencedTableName: 'Subscription',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('SubscriptionItem')
    await queryRunner.dropTable('Subscription')
  }
}
