import { Module } from '@nestjs/common'
import { SubscriptionModule } from './subscription/subscription.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    SubscriptionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
    }),
  ],
})
export class AppModule {}
