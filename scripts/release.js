#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs-extra');
const read = require('readline-sync');
const path = require('path');
const semver = require('semver');
const program = require('commander');
const execSync = require('child_process').execSync;

const logger = {
    info: msg => {
        console.log(chalk.bgBlue.black('[INFO]'), chalk.blue(msg));
    },
    warn: msg => {
        console.log(chalk.bgYellow.black('[WARN]'), chalk.yellow(msg));
    },
    error: msg => {
        console.log(chalk.bgRed.black('[ERROR]'), chalk.red(msg));
    },
    success: msg => {
        console.log(chalk.bgGreen.black('[SUCCESS]'), chalk.green(msg));
    }
};

program.option('-s, --steps [type]', 'step: fetch, bump, changelog, docs, checkout, default all').parse(process.argv);

const steps = (program.steps || 'fetch,bump,changelog,docs,checkout').split(',');

logger.info(`starting releasing...`);

let nextVersion;

if (steps.includes('fetch')) {
    fetchLatestVersions();
}

if (steps.includes('bump')) {
    bumpVersion();
}

if (steps.includes('changelog')) {
    updateChangelog();
}

if (steps.includes('docs')) {
    buildDocs();
}

if (steps.includes('checkout')) {
    checkout();
}

function fetchLatestVersions() {
    logger.info('fetching latest versions...');
    execSync('git checkout master');
    execSync('git pull upstream master');
    execSync('git fetch upstream master --prune --tags');
    logger.success('✔ latest versions has been fetched!');
}

/**
 * bump version
 */
function bumpVersion() {
    logger.info('bumping version...');

    const packageJsonPath = path.join(__dirname, '../src/package.json');
    const rootPackageJsonPath = path.join(__dirname, '../package.json');
    const versionPath = path.join(__dirname, '../src/version.ts');

    const packageJson = fs.readJsonSync(packageJsonPath);
    const rootPackageJson = fs.readJsonSync(rootPackageJsonPath);
    const currentVersion = packageJson.version;
    let versionIsValid = false;
    let version;

    while (!versionIsValid) {
        version = read.question(
            chalk.bgYellow.black(`current version is ${currentVersion}, Please input the new version:  `)
        );

        if (semver.valid(version) && semver.gt(version, currentVersion)) {
            versionIsValid = true;
            nextVersion = version;
        } else {
            logger.error(
                `your input ${version} is not after the current version ${currentVersion} or is invalid. please retry input.`
            );
        }
    }

    fs.writeJsonSync(packageJsonPath, { ...packageJson, version: version }, { spaces: 2 });
    logger.success(`✔ bumping version src/package.json from ${currentVersion} to ${version}!`);
    fs.writeJsonSync(rootPackageJsonPath, { ...rootPackageJson, version: version }, { spaces: 2 });
    logger.success(`✔ bumping version package.json from ${currentVersion} to ${version}!`);
    fs.writeFileSync(
        versionPath,
        fs.readFileSync(versionPath, 'utf-8').replace(/Version\('.+'\);/g, `Version('${version}');`)
    );
    logger.success(`✔ bumping version src/version.ts from ${currentVersion} to ${version}!`);
    logger.success('✔ bumping version success!');
}

function updateChangelog() {
    logger.info('updating changelog...');
    execSync('npm run changelog');
    logger.success('✔ changelog generated!');
}

function buildDocs() {
    logger.info('running build:docs script...');
    execSync('npm run build:docs', { stdio: [0, 1, 2] });
    logger.info('✔ docs generated!');
}

function checkout() {
    logger.info('checkout and push a new branch for publishing...');
    execSync(`git checkout -b release-${nextVersion}`);
    execSync('git add .');
    execSync(`git commit -m "chore(release): upgrade to ${nextVersion}"`);
    execSync(`git push origin release-${nextVersion}`);
    logger.success('✔ please go to GitHub and create a pull request.');
}
