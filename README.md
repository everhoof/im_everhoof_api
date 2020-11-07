# Everhoof Instant Messaging System API
> API for Everhoof Instant Messaging system

## Requirements

* Node 10

## Deploying

Clone the repo and install the dependencies.

```bash
git clone --single-branch -b dist https://github.com/everhoof/im_everhoof_api.git
cd im_everhoof_api
```

```bash
yarn --frozen-lockfile --prod
```

Update configs.

```bash
cp ormconfig.prod.js ormconfig.js
nano ormconfig.js
```

```bash
cp .env.example .env
nano .env
```

Run migrations.

```bash
yarn orm migrations:run
```

```bash
yarn seed:run
```

Use process manager to start the application.

```bash
pm2 start yarn --name IM_Everhoof_API -- start:prod
pm2 save
```
Application will start on 5510 port.
