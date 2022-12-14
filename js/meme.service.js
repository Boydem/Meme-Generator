'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        text: 'LolXdHaHa',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
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
        fontSize: 32,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: false,
        isDrag: false
    })
}

// EDITOR SERVICE


function setColor(action, color) {
    switch (action) {
        case 'stroke':
            gMeme.lines[0].strokeColor = color
            break;
        case 'fill':
            gMeme.lines[0].fillColor = color
            break;
        default:
            break;
    }
}

function alignTo(action) {
    switch (action) {
        case 'left':
            gMeme.lines[0].alignTo = 'end'
            break;
        case 'center':
            gMeme.lines[0].alignTo = 'center'
            break;
        case 'right':
            gMeme.lines[0].alignTo = 'start'
            break;
        default:
            break;
    }
}

function setLineFont(action, fontFamily) {
    switch (action) {
        case 'family':
            gMeme.lines[0].fontFamily = fontFamily
            break;
        case 'size+':
            gMeme.lines[0].fontSize += 10
            break;
        case 'size-':
            gMeme.lines[0].fontSize -= 10
            break;
        default:
            break;
    }
}