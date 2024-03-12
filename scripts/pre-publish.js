#!/usr/bin/env node
const chalk = require('chalk');
const version = process.env.npm_package_version;
const publishTagName = process.env.npm_config_tag || 'latest';

if (version.includes('next') && publishTagName !== 'next') {
    console.log(
        chalk.bgRed.black('[ERROR]'),
        chalk.red(
            `✘ Publish the next version, please use ${chalk.blue('npm run pub-next')}`
        )
    );
    process.exit(1);
}
