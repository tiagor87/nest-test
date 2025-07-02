import { DataSource, DefaultNamingStrategy } from 'typeorm'

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

export const dataSource = new DataSource({
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
})
