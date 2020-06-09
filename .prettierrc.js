const { prettier } = require('@worktile-devkit/config');

module.exports = {
    ...prettier.frontendConfig,
    overrides: [
        ...prettier.frontendConfig.overrides,
        {
            files: '*.scss',
            options: {
                tabWidth: 4
            }
        }
    ]
};
