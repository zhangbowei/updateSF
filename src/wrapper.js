function setPromise(fn) {
    return (data) => new Promise((res, rej) => fn(data, res, rej));
}

function getData(args) {
    return args[0];
}

function getRes(args) {
    return args[args.length - 2];
}

function getRej(args) {
    return args[args.length - 1];
}

module.exports = {
    setPromise,
    getRes,
    getRej,
    getData
};

