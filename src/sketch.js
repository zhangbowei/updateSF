const gain = require("./gain");
const sale = require("./sale");

const stepArr = [gain, sale].reduce(function (prev, item) {
    return prev.concat(item);
}, []);

const runStep = function (iterator) {
    if (iterator === stepArr.length)
        return;
    return (data) => stepArr[iterator](data).then(runStep(++iterator));
}

const updateSF = function () {
    return runStep(0)().catch((err) => console.log(err));
}

module.exports = updateSF;