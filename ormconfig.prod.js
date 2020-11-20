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
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/**/*.js'],
    subscribers: ['dist/database/subscribers/**/*.js'],
    cli: {
      entitiesDir: 'dist/database/entities',
      migrationsDir: 'dist/database/migrations',
      subscribersDir: 'dist/database/subscribers',
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
    entities: ['dist/**/*.entity.ts'],
    migrations: ['dist/database/seeds/**/*.js'],
    cli: {
      migrationsDir: 'dist/database/seeds',
    },
  },
];
