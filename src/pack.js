const cheerio = require('cheerio')
const argv = require("./argv");

const base = (function () {
    const header = {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,ja;q=0.2',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        DNT: 1,
        Host: 'segmentfault.com',
        Origin: 'https://segmentfault.com',
        Pragma: 'no-cache',
        Referer: 'https://segmentfault.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    };

    return {
        getHeader: function () {
            return header;
        },
        setReferer: function (data) {
            header['Referer'] = data;
        }
    };
})();

const url = (function () {
    const origin = 'https://segmentfault.com';
    const path = {
        origin,
        login: `${origin}/api/user/login`,
        write: `${origin}/write?freshman=1`,
        draft: `${origin}/api/article/draft/save`,
        tag: `${origin}/api/tags/search`,
        newFile: `${origin}/api/articles/add`,
        editFile: `${origin}/api/article/${argv.fileCard}/edit`,
        note: `${origin}/u/${argv.nickname}/notes?page=`
    }
    const res = {};

    for (let key in path) {
        const name = ['getPath', key.replace(/^\w/, (item) => item.toUpperCase())].join('');

        res[name] = function () { return path[key]; };
    }

    return res;
})();

const card = (function () {
    let cookie = '';

    return {
        getCookie: function () {
            return cookie;
        },
        setCookie: function (data) {
            cookie = data;
        }
    };
})();

const link = (function () {
    let address = '';

    return {
        getAddress: function () {
            return address;
        },
        setAddress: function (url) {
            address = url;
        }
    };
})();

const inquiry = (function () {
    let query = null;

    return {
        getQuery: function () {
            return query;
        },
        setQuery: function (data) {
            query = data;
        },
        changeQuery: function(obj) {
            for (let key in obj) {
                query[key] = obj[key];
            }
        }
    };
})();

const option = (function () {
    let conf = {
        "username": argv.user,
        "password": argv.password,
        "remember": 1
    };

    return {
        getConf: function () {
            return conf;
        },
        setConf: function (data) {
            conf = data;
        },
        changeConf: function (obj) {
            for (let key in obj) {
                conf[key] = obj[key];
            }
        }
    };
})();

const pack = [base, card, link, inquiry, option, url].reduce(function (prev, item) {
    for (let key in item) {
        prev[key] = item[key];
    }
    return prev;
}, {});

module.exports = pack;