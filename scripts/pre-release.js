const chalk = require('chalk');

const command = process.env.npm_lifecycle_event;
const args = process.argv;
const version = args[2];

if (version.includes('next') && !command.includes('next')) {
    console.log(
        chalk.bgRed.black('[ERROR]'),
        chalk.red(`✘ Publish the next version, please use ${chalk.blue('npm run release-next')}`),
    );
    process.exit(1);
} else if (!version.includes('next') && command.includes('next')) {
    console.log(
        chalk.bgRed.black('[ERROR]'),
        chalk.red(`✘ Publish the latest version, please use ${chalk.blue('npm run release')}`),
    );
    process.exit(1);
}
