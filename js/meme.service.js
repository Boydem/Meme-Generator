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
let gPrevSelectedLine = gMeme.lines[0]

function genLineId() {
    gLastLineId = gMeme.lines[gMeme.lines.length - 1].id + 1
    return gLastLineId
}

function setImg(elImg) {
    gElCurrMemeImg = elImg
}

function getSelectedLine() {
    return gMeme.lines.find(gLine => gLine.isSelected) || gMeme.lines[0]
}

function getSelectedLineIdx() {
    return gMeme.lines.findIndex(gLine => gLine.isSelected) || 0
}

function unselectLines() {
    gMeme.lines.forEach(line => {
        if (line.isSelected === true) {
            line.isSelected = false
        }
    })
}

function unselectLine(line) {
    gMeme.lines.find(gLine => gLine.id === line.id).isSelected = false
}

function selectLine(line) {
    if (!line) return
    const currSelectedIdx = gMeme.lines.findIndex(gLine => gPrevSelectedLine.id === gLine.id && gLine.isSelected === true)
    gPrevSelectedLine = line
    if (currSelectedIdx >= 0) {
        gMeme.lines[currSelectedIdx].isSelected = false
    }
    gMeme.lines.find(gLine => line.id === gLine.id).isSelected = true
}

function switchLine() {
    const currSelectedIdx = gMeme.lines.findIndex(line => line.isSelected === true)
    console.log('currSelectedIdx:', currSelectedIdx)
    gMeme.lines[currSelectedIdx].isSelected = false
    if (currSelectedIdx === 0) {
        gMeme.lines[gMeme.lines.length - 1].isSelected = true
    } else {
        gMeme.lines[currSelectedIdx - 1].isSelected = true
    }
}

function moveLine(line, toPos) {
    if (!line) return
    const draggedLineIdx = gMeme.lines.findIndex(gLine => gLine.isDrag && gLine.isSelected)
    if (draggedLineIdx === -1) return
    console.log('toPos:', toPos)
    console.log('line:', line)
    gMeme.lines[draggedLineIdx].pos.x = toPos.x
    gMeme.lines[draggedLineIdx].pos.y = toPos.y
}

function allowDrag(line) {
    if (!line) return
    gMeme.lines.find(gLine => line.id === gLine.id).isDrag = true
}

function disableDrag(line) {
    if (!line) return
    gMeme.lines.find(gLine => line.id === gLine.id).isDrag = false
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
    if (idx < 0) return 'not selected line'
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