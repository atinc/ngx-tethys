var replace = require('replace');

replace({
    regex: /(#\sChange\sLog([\s\S]*)guidelines\.)/,
    replacement: '',
    paths: ['./CHANGELOG.md'],
    recursive: false,
    silent: true
});
