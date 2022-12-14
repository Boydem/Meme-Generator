'use strict'

let gMeme
let gMemes

function onInit() {
    gMemes = _createMemes()
}

function _createMeme(keywords, img) {
    return {
        id: makeId(),
        keywords,
        imgURL: `images/${img}.jpg`,
        lines: [{
            text: 'Word',
            fontSize: '',
            color: '',
            fontFamily: '',
            pos: {
                x: 0,
                y: 0
            },
            isSelected: false,
            isDrag: false
        }]
    }
}

function _createMemes() {
    return [
        _createMeme(['a'], '001'),
        _createMeme(['a', 'b'], '002'),
        _createMeme(['a', 'b', 'c'], '003')
    ]
}