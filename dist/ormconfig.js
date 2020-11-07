const host = '192.168.1.203';
const port = 3306;
const username = 'everhoof';
const password = 'everhoof';
const database = 'everhoof_im_dev';
const testDatabase = 'everhoof_im_test';
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
        entities: ['dist/**/*.entity.js'],
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
        entities: ['src/**/*.entity.ts'],
        migrations: ['database/seeds/**/*.ts'],
        cli: {
            migrationsDir: 'database/seeds',
        },
    },
    {
        name: 'test',
        type: 'mariadb',
        host,
        port,
        username,
        password,
        database: testDatabase,
        timezone: '+00:00',
        dropSchema: true,
        migrationsRun: true,
        logging: false,
        entities: ['src/**/*.entity.ts'],
        migrations: ['database/migrations/**/*.ts'],
        subscribers: ['database/subscribers/**/*.ts'],
    },
];
//# sourceMappingURL=ormconfig.js.map