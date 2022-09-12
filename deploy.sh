export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

find . -maxdepth 1 ! -name node_modules ! -name artifacts.tgz ! -name .env.local ! -name . ! -name .. -exec rm -rf {} \;
tar -xvf artifacts.tgz
rm artifacts.tgz

pm2 stop ecosystem.config.js
nvm exec 14.18.1 npm i -g yarn
nvm exec 14.18.1 yarn --frozen-lockfile --production
nvm exec 14.18.1 yarn typeorm:prod migration:run
nvm exec 14.18.1 yarn seeder:prod migration:run
pm2 start ecosystem.config.js
pm2 save
