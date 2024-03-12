#!/usr/bin/env node
const { execSync } = require('child_process');
const chalk = require('chalk');

const releaseFormat = /^release-auto-v(.*)$/;
const releaseNextFormat = /^release-auto-next-v(.*)$/;
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
if (releaseFormat.test(currentBranch)) {
    const version = currentBranch.match(releaseFormat)[1];
    if (version.includes('next')) {
        handleError(version);
    }
} else if (releaseNextFormat.test(currentBranch)) {
    const version = currentBranch.match(releaseNextFormat)[1];
    if (!version.includes('next')) {
        handleError(version);
    }
}

function handleError(version) {
    const colors = {
        red: '\x1b[31m',
        black: '\x1b[30m',
        blue: '\x1b[34m',
        bgRed: '\x1b[41m',
        reset: '\x1b[0m'
    };
    let isNextVersion = version.includes('next');
    console.log(
        colors.bgRed + colors.black + '[ERROR]' + colors.reset,
        colors.red + `✘ Publish the ${ isNextVersion ? 'next' : 'latest' } version, please use ` + colors.reset,
        colors.blue + `npm run release${isNextVersion ? '-next' : ''}` + colors.reset
    );
    execSync('git checkout -');
    execSync(`git branch -D ${currentBranch}`);
    process.exit(1);
}