require('./environment');

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'dist/main.js',
      interpreter: 'node@14.18.1',
      autorestart: true,
    },
  ],
};
