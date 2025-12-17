module.exports = {
    allowBranch: ['master', 'v16.*', 'v17.*', 'v18.*', 'v19.*', 'v20.*', 'v21.*', 'release-auto-*'],
    bumpFiles: [
        'package.json',
        'package-lock.json',
        'src/package.json',
        'cdk/package.json',
        {
            filename: './src/version.ts',
            type: 'code'
        },
        {
            filename: './schematics/version.ts',
            type: 'code'
        }
    ],
    skip: {
        confirm: true
    },
    // backward compatibility changelog
    // because we didn't use tag prefix(v) when create tag before
    // should set tagPrefix as empty (default is 'v')
    // otherwise, the changelog will rebuild, and will be lost past versions
    tagPrefix: '',
    hooks: {
        prepublish: 'npm run build',
        prereleaseBranch: 'node ./scripts/pre-release.js {{version}}'
    },
    dryRun: true
};
