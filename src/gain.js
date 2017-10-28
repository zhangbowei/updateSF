const wrapper = require("./wrapper");
const pack = require('./pack');
const record = require('./record');
const template = require('./template');

function getPageCount() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    //infinity不行，必须是真实数
    pack.setAddress([pack.getPathNote(), 999999].join(''));
    template.getRequest(function (data) {
        const rawStr = data.text;
        const res = rawStr.match(/(\d+)<\/a><\/li><\/ul><\/div><\/div><\/div><\/div><\/div>/);

        record.setCount(res ? +res[1] : 0);
    }, { fulfill, reject });
}

async function parsePageContent() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    fulfill();

    const sleep = () => new Promise((res) => setTimeout(() => res(), 100));

    for (let index = 1; index <= record.getCount(); ++index) {
        await sleep();
        pack.setAddress([pack.getPathNote(), index].join(''));
        template.getRequest(function (data) {
            const rawStr = data.text;
            let res = [];

            rawStr.replace(/<a class="profile-mine__content--title" href="(.*?)">(.*?)</gi, function (all, itemA, itemB) {
                // res.push(["---", ["[", itemB, "]", "(https://segmentfault.com", itemA, ") "].join('')].join('\n'));
                res.push(["", ["[", itemB, "]", "(https://segmentfault.com", itemA, ") "].join('')].join('\n'));
            });
            record.addNote(index, res);
        });
    }
}

function ensureParseFinish() {
    const count = record.getCount();
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);

    record.setListenNote(function(length) {
        if (length === count) {
            fulfill();
        }
    });
}

function productFile() {
    const fulfill = wrapper.getRes(arguments);
    const reject = wrapper.getRej(arguments);
    const file = record.getNote().reduce(function(stock, good) {
        return stock.concat(good);
    }, []).join('\n');

    record.setFile(file);
    fulfill();
}

const gain = (function () {
    const rawFnArr = [
        getPageCount,
        parsePageContent,
        ensureParseFinish,
        productFile
    ];
    const wrapFnArr = rawFnArr.map(function (item) {
        return wrapper.setPromise(item);
    });

    return wrapFnArr;
})();

module.exports = gain;


