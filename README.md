# Everhoof Instant Messaging System API
> API for Everhoof Instant Messaging system

## Requirements

* Node 14

## Build Setup

#### Clone the repo and install the dependencies.

```bash
git clone --single-branch -b dist https://github.com/everhoof/im_everhoof_api.git
cd im_everhoof_api
```

```bash
yarn --frozen-lockfile
```

#### Update configs.

```bash
cp .env.example .env
nano .env
```

#### Run migrations.

```bash
yarn typeorm migration:run
```

```bash
yarn seeder migration:run
```

#### Before commit and push run:
```bash
$ yarn format
$ yarn lint
```

## Prepare for deployment

### Create folders for app
```bash
$ mkdir -p /path/to/production/folder
$ mkdir -p /path/to/staging/folder
```

### Create and fill .env.local files
```bash
$ nano /path/to/production/folder/.env.local
$ nano /path/to/production/folder/.env.local
```

### Create Secrets in GitHub Actions:
#### For staging
- `STAGING_SSH_HOST=127.0.0.1`
- `STAGING_SSH_PORT=22`
- `STAGING_SSH_USER=root`
- `STAGING_SSH_KEY=...`
- `STAGING_APP_DIR=/path/to/staging/folder`
- `STAGING_NODE_ENV=production`

#### For production
- `PRODUCTION_SSH_HOST=127.0.0.1`
- `PRODUCTION_SSH_PORT=22`
- `PRODUCTION_SSH_USER=root`
- `PRODUCTION_SSH_KEY=...`
- `PRODUCTION_APP_DIR=/path/to/production/folder`
- `PRODUCTION_NODE_ENV=production`

### Manual run on server (optional)
```bash
$ cd $APP_DIR
$ export NODE_ENV=production
$ pm2 start
```
