'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        id: 1,
        text: 'Your Text Here',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: true,
        isDrag: false,
    }]
}

let gLastLineId
let gSelectedLine

function genLineId() {
    gLastLineId = gMeme.lines[gMeme.lines.length - 1].id + 1
    return gLastLineId
}


function getSelectedLine() {
    return gMeme.lines.find(gLine => gLine.isSelected) || gMeme.lines[0]
}

function getSelectedLineIdx() {
    return gMeme.lines.findIndex(gLine => gLine.isSelected) || 0
}

function unselectLines() {
    if (gMeme.lines.find(gLine => gLine.isSelected)) {
        gMeme.lines.find(gLine => gLine.isSelected).isSelected = false
    }
}

function selectLine(line) {
    const isSelectedLine = gMeme.lines.find(gLine => gLine.isSelected)
    if (isSelectedLine) {
        gMeme.lines.find(gLine => gLine.isSelected).isSelected = false
    } else if (!isSelectedLine) {
        gMeme.lines[line.id - 1].isSelected = true
    }
    if (isSelectedLine && isSelectedLine.id === line.id) {
        return
    }
    gMeme.lines.find(gLine => line.id === gLine.id).isSelected = true
}

function getCurrMeme() {
    return gMeme
}

function getMemeLines() {
    return gMeme.lines
}

function saveLinePosForRect(idx, pos) {
    gMeme.lines[idx].posForRect = pos
}

function saveLinePos(idx, pos) {
    gMeme.lines[idx].pos = pos
}

function saveLineSizes(idx, lineSizes) {
    gMeme.lines[idx].sizes = lineSizes
}

function getLineSizes(idx) {
    return gMeme.lines[idx].sizes
}

function setLineTxt(text) {
    let idx = getSelectedLineIdx()
    gMeme.lines[idx].text = text
}

function addLine() {
    gMeme.lines.push({
        id: genLineId(),
        text: 'Another Line',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: true,
        isDrag: false,
    })
    gMeme.lines[gMeme.lines.length - 1].isSelected = false
}

function resetLines() {
    gMeme.lines = [{
        id: 1,
        text: 'Your Text Here',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: true,
        isDrag: false,
    }]
}

// EDITOR SERVICE


function setColor(action, color) {
    let idx = getSelectedLineIdx()
    switch (action) {
        case 'stroke':
            gMeme.lines[idx].strokeColor = color
            break;
        case 'fill':
            gMeme.lines[idx].fillColor = color
            break;
        default:
            break;
    }
}

function alignTo(action) {
    let idx = getSelectedLineIdx()
    switch (action) {
        case 'left':
            gMeme.lines[idx].alignTo = 'end'
            break;
        case 'center':
            gMeme.lines[idx].alignTo = 'center'
            break;
        case 'right':
            gMeme.lines[idx].alignTo = 'start'
            break;
        default:
            break;
    }
}

function setLineFont(action, fontFamily) {
    let idx = getSelectedLineIdx()
    switch (action) {
        case 'family':
            gMeme.lines[idx].fontFamily = fontFamily
            break;
        case 'size+':
            gMeme.lines[idx].fontSize += 10
            break;
        case 'size-':
            gMeme.lines[idx].fontSize -= 10
            break;
        default:
            break;
    }
}