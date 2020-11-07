const ghpages = require('gh-pages');
ghpages.publish('.', {
    src: [
        'dist/**/*',
        'resources/**/*',
        'mail/**/*',
        'ormconfig.ex.prod.js',
        'package.json',
        'yarn.lock',
        '.env.example',
        'tsconfig.json',
    ],
    branch: 'dist',
}, (e) => {
    if (e) {
        console.log(e);
    }
});
//# sourceMappingURL=deploy.js.map