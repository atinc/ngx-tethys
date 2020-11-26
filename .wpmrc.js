module.exports = {
    allowBranch: ['master', 'v7.*', 'v8.*', 'v9.*'],
    bumpFiles: [
        'package.json',
        'package-lock.json',
        'src/package.json',
        {
            filename: './src/version.ts',
            type: 'code'
        }
    ],
    // backward compatibility changelog
    // because we didn't use tag prefix(v) when create tag before
    // should set tagPrefix as empty (default is 'v')
    // otherwise, the changelog will rebuild, and will be lost past versions
    tagPrefix: '',
    hooks: {
        prepublish: 'npm run build',
        postpublish: 'npm run pub-only'
    }
};
