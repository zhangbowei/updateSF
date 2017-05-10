const note = (function () {
    const noteArr = [];
    let listenNote;

    const setListenNote = function (callbackFn) {
        listenNote = function () {
            callbackFn(noteArr.length);
        };
    };

    const addNote = function (order, noteStr) {
        const index = order;
        const data = noteStr;

        noteArr.push({ index, data });
        listenNote();
    }

    const getNote = function () {
        return noteArr.slice()
            .sort((a, b) => a.index - b.index)
            .reduce(function(prev, item) {
                return prev.concat(item.data);
            }, []);
    }

    return {
        addNote,
        getNote,
        setListenNote
    }
})();

const count = (function () {
    let count;
    const setCount = function (value) {
        count = value;
    }
    const getCount = function () {
        return count;
    }

    return {
        setCount,
        getCount
    };
})();

const paper = (function () {
    let file;
    const setFile = function (value) {
        file = value;
    }
    const getFile = function () {
        return file;
    }

    return {
        setFile,
        getFile
    };
})();

module.exports = {
    addNote: note.addNote,
    getNote: note.getNote,
    setListenNote: note.setListenNote,
    setCount: count.setCount,
    getCount: count.getCount,
    setFile: paper.setFile,
    getFile: paper.getFile
};
