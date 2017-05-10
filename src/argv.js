const argv = require('yargs').argv;

const user = argv.user ? argv.user : process.env.SF_USER;
const password = argv.password ? argv.password : process.env.SF_PASSWORD;
const nickname = argv.nickname ? argv.nickname : process.env.SF_NICKNAME;
const fileTitle = argv.fileTitle ? argv.fileTitle : (process.env.SF_FILETITLE ? process.env.SF_FILETITLE : '测试文章');
const fileTag = JSON.parse(argv.fileTag ? argv.fileTag : (process.env.SF_FILETAG ? process.env.SF_FILETAG : '["javascript"]'));
const fileCard = argv.fileCard ? argv.fileCard : (process.env.SF_FILECARD ? process.env.SF_FILECARD : '');

module.exports = {
    user,
    password,
    nickname,
    fileTitle,
    fileTag,
    fileCard
}
