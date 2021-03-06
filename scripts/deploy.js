// eslint-disable-next-line @typescript-eslint/no-var-requires
const ghpages = require('gh-pages');

ghpages.publish(
  '.',
  {
    src: [
      'dist/**/*',
      'resources/**/*',
      'mail/**/*',
      'ormconfig.prod.js',
      'package.json',
      'yarn.lock',
      '.env.example',
      'tsconfig.json',
    ],
    branch: 'dist',
  },
  (e) => {
    if (e) {
      console.log(e);
    }
  },
);
