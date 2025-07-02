import { Module } from '@nestjs/common'
import { SubscriptionModule } from './subscription/subscription.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DefaultNamingStrategy } from 'typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { SharedModule } from './shared/shared.module'

class SqalaNamingStrategy extends DefaultNamingStrategy {
  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    const name = customName || propertyName
    return embeddedPrefixes
      .join()
      .concat(
        embeddedPrefixes.length ? name[0].toUpperCase() + name.slice(1) : name,
      )
  }

  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ?? targetName
  }
}

@Module({
  imports: [
    SubscriptionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app-subscription',
      synchronize: false,
      migrationsRun: false,
      namingStrategy: new SqalaNamingStrategy(),
      entities: ['**/*.schema.js'],
      migrations: ['**/*.migration.js'],
    }),
    CqrsModule.forRoot(),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
