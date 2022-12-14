'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        text: 'LoL XD HAHA',
        fontSize: '32px',
        strokeColor: 'white',
        fillColor: 'black',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: false,
        isDrag: false,
    }]
}

function getMemeLines() {
    return gMeme.lines
}

function saveLinePos(idx, pos) {
    gMeme.lines[idx].pos = pos
}

function setLineTxt(text) {
    gMeme.lines[0].text = text
}

function addLine() {
    gMeme.lines.push({
        text: 'XD XD XD',
        fontSize: '32px',
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: false,
        isDrag: false
    })
}