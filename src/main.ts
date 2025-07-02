import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DomainExceptionFilter } from './subscription/app/controllers/exception-filter.controller'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new DomainExceptionFilter())
  await app.listen(process.env.PORT ?? 6655)
}
bootstrap()
