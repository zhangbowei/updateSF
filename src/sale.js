const cheerio = require('cheerio');
const wrapper = require("./wrapper");
const pack = require('./pack');
const record = require('./record');
const template = require('./template');
const argv = require("./argv");

function getMainPage() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    pack.setAddress(pack.getPathOrigin());
    template.getRequest(function (data) {
        const rawPack = data;
        const rawStr = rawPack.text;
        const $ = cheerio.load(rawStr);
        const text = $('body script').eq(5).text();
        const fn = new Function('window', text + ';return window.SF.token');
        const token = fn({});

        pack.setQuery({ '_': token });
        pack.setCookie(rawPack.headers['set-cookie'].join(',').match(/(PHPSESSID=.+?);/)[1]);
    }, { fulfill, reject });
}

function loginPage() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    pack.setAddress(pack.getPathLogin());
    template.postRequest(function (data) {
        return null;
    }, { fulfill, reject });
}

function getWritePage() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    pack.setAddress(pack.getPathWrite());
    pack.setQuery(null);
    template.getRequest(function (data) {
        const rawPack = data;
        const rawStr = rawPack.text;
        const $ = cheerio.load(rawStr);
        // const text = $('body script').eq(14).text();
        const text = rawStr;
        const t = text.match(/<script>[\s\S]*?(\(function \(w\) \{[\s\S]*?w\.SF\.token[\s\S]*?)<\/script>/i)[1];
        const fn = new Function('window', t + 'return window.SF.token');
        const token = fn({});

        pack.setQuery({ '_': token });
        pack.setConf({
            do: 'saveArticle',
            type: 1,
            title: '',
            text: '',
            weibo: 0,
            blogId: $('select[name=blogId] option').eq(-1).val(),
            id: '',
            articleId: '',
            'tags%5B%5D': ''
        });
    }, { fulfill, reject });

}

function getDraftId() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    pack.setAddress(pack.getPathDraft());
    pack.setReferer(pack.getPathWrite());

    template.postRequest(function (res) {
        pack.changeConf({ draftId: res.body.data });
    }, { fulfill, reject });
}

function getTag() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);
    const tagArr = argv.fileTag;
    const resArr = tagArr.reduce(function (prev, item) {
        pack.setAddress(pack.getPathTag());
        pack.changeQuery({ 'q': item });
        return prev.concat([
            new Promise((ful, rej) => {
                template.getRequest(function (res) {
                    let v = res.body.data.filter(_tag => _tag.name === item)[0];
                    ful(v.id);
                });
            })
        ]);
    }, []);

    Promise.all(resArr).then((idArr) => {
        fulfill(idArr);
    });
}

function pushFile() {
    const tagIdArr = wrapper.getData(arguments);
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    pack.setAddress(argv.fileCard ? pack.getPathEditFile() : pack.getPathNewFile());
    pack.changeConf({
        do: '',   //发布文章必须置空
        title: argv.fileTitle,
        text: encodeURIComponent(record.getFile()),
        id: argv.fileCard,
        license: 0
    });
    pack.setConf(Object.keys(pack.getConf())
        .map(k => `${k}=${pack.getConf()[k]}`)
        .concat(tagIdArr.map(tagId => `tags%5B%5D=${tagId}`))
        .join('&'));

    template.postRequest(function (data) {
        const rawPack = data;

        console.log(['Status', rawPack.status].join(': '));
    }, { fulfill, reject });
}

const sale = (function () {
    const rawFnArr = [
        getMainPage,
        loginPage,
        getWritePage,
        getDraftId,
        getTag,
        pushFile
    ];
    const wrapFnArr = rawFnArr.map(function (item) {
        return wrapper.setPromise(item);
    });

    return wrapFnArr;
})();

module.exports = sale;



