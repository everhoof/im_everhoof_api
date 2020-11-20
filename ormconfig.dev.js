const host = 'localhost';
const port = 5432;
const username = 'everhoof';
const password = 'everhoof';
const database = 'everhoof';
const schema = 'im';

module.exports = [
  {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    timezone: 'Z',
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
  {
    name: 'cli',
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    timezone: 'Z',
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['database/migrations/**/*.ts'],
    subscribers: ['database/subscribers/**/*.ts'],
    cli: {
      entitiesDir: 'database/entities',
      migrationsDir: 'database/migrations',
      subscribersDir: 'database/subscribers',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    timezone: 'Z',
    synchronize: false,
    logging: false,
    migrationsTableName: 'seeds',
    entities: ['src/**/*.entity.ts'],
    migrations: ['database/seeds/**/*.ts'],
    cli: {
      migrationsDir: 'database/seeds',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema: schema + '_test',
    timezone: 'Z',
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
  },
];
