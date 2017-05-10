const request = require('superagent');
const pack = require('./pack');

function getRequest(callbackFn, async) {
    const processFn = callbackFn ? callbackFn : function (data) { return data; };
    const fulfill = (async && async.fulfill) ? async.fulfill : function () { };
    const reject = (async && async.reject) ? async.reject : function () { };

    request
        .get(pack.getAddress())
        .query(pack.getQuery())
        .set(pack.getHeader())
        .set('Cookie', pack.getCookie())
        .redirects(0)
        .end((err, res) => {
            if (err) reject(err);
            else fulfill(processFn(res));
        });
}

function postRequest(callbackFn, async) {
    const processFn = callbackFn ? callbackFn : function (data) { return data; };
    const fulfill = (async && async.fulfill) ? async.fulfill : function () { };
    const reject = (async && async.reject) ? async.reject : function () { };

    request
        .post(pack.getAddress())
        .query(pack.getQuery())
        .set(pack.getHeader())
        .set('Cookie', pack.getCookie())
        .type('form')
        .send(pack.getConf())
        .redirects(0)
        .end((err, res) => {
            if (err) reject(err);
            else fulfill(processFn(res));
        })
}

module.exports = {
    getRequest,
    postRequest
};