declare const _exports: {
    [n: number]: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
    length: number;
    toString(): string;
    toLocaleString(): string;
    pop(): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    } | undefined;
    push(...items: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]): number;
    concat(...items: ConcatArray<{
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>[]): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    concat(...items: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    } | ConcatArray<{
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>)[]): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    join(separator?: string | undefined): string;
    reverse(): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    shift(): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    } | undefined;
    slice(start?: number | undefined, end?: number | undefined): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    sort(compareFn?: ((a: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, b: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }) => number) | undefined): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    splice(start: number, deleteCount?: number | undefined): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    splice(start: number, deleteCount: number, ...items: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    unshift(...items: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]): number;
    indexOf(searchElement: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, fromIndex?: number | undefined): number;
    lastIndexOf(searchElement: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, fromIndex?: number | undefined): number;
    every(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => unknown, thisArg?: any): boolean;
    some(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => unknown, thisArg?: any): boolean;
    forEach(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => U, thisArg?: any): U[];
    filter<S extends {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => value is S, thisArg?: any): S[];
    filter(callbackfn: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => unknown, thisArg?: any): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    reduce(callbackfn: (previousValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
    reduce(callbackfn: (previousValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, initialValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
    reduce<U_1>(callbackfn: (previousValue: U_1, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => U_1, initialValue: U_1): U_1;
    reduceRight(callbackfn: (previousValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
    reduceRight(callbackfn: (previousValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, initialValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    };
    reduceRight<U_2>(callbackfn: (previousValue: U_2, currentValue: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, currentIndex: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => U_2, initialValue: U_2): U_2;
    find<S_1 extends {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>(predicate: (this: void, value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, obj: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => value is S_1, thisArg?: any): S_1 | undefined;
    find(predicate: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, obj: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => unknown, thisArg?: any): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    } | undefined;
    findIndex(predicate: (value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, obj: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => unknown, thisArg?: any): number;
    fill(value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, start?: number | undefined, end?: number | undefined): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    copyWithin(target: number, start: number, end?: number | undefined): ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[];
    [Symbol.iterator](): IterableIterator<{
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>;
    entries(): IterableIterator<[number, {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<{
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }>;
    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
    includes(searchElement: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, fromIndex?: number | undefined): boolean;
    flatMap<U_3, This = undefined>(callback: (this: This, value: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    }, index: number, array: ({
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    } | {
        name: string;
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        timezone: string;
        synchronize: boolean;
        logging: boolean;
        migrationsTableName: string;
        entities: string[];
        migrations: string[];
        cli: {
            migrationsDir: string;
        };
    })[]) => U_3 | readonly U_3[], thisArg?: This | undefined): U_3[];
    flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
    flat<U_4>(this: (readonly U_4[])[], depth?: 1 | undefined): U_4[];
};
export = _exports;
