const host = 'localhost';
const port = 3306;
const username = 'everhoof';
const password = 'everhoof';
const database = 'everhoof_im';
module.exports = [
    {
        type: 'mariadb',
        host,
        port,
        username,
        password,
        database,
        timezone: '+00:00',
        synchronize: false,
        logging: false,
        entities: ['**/*.entity.js'],
    },
    {
        name: 'cli',
        type: 'mariadb',
        host,
        port,
        username,
        password,
        database,
        timezone: '+00:00',
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
        type: 'mariadb',
        host,
        port,
        username,
        password,
        database,
        timezone: '+00:00',
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
//# sourceMappingURL=ormconfig.prod.js.map