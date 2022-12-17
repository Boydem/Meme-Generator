'use strict'

const MEMES_DB_KEY = 'memesDB'

let gMemes = loadFromStorage(MEMES_DB_KEY) || []

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
        isDrag: false
    }]
}

let gLastLineId
let gSelectedLine
let gPrevSelectedLine = gMeme.lines[0]

// EMOJIS
let gEmojis = []
_createEmojis()
var gEmojiPageIdx = 0
const PAGE_SIZE = 20

function resetMeme() {
    gMeme = {
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
            isDrag: false
        }]
    }
}

function genLineId() {
    gLastLineId = (gMeme.lines.length ? gMeme.lines[gMeme.lines.length - 1].id + 1 : 1)
    return gLastLineId || 1
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gElCurrMemeImg = document.querySelector(`img[data-id="${imgId}"]`)
}

function getSelectedLine() {
    return gMeme.lines.find(gLine => gLine.isSelected) || null
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
    if (currSelectedIdx === -1) {
        if (!gMeme.lines.length) return
        gMeme.lines[0].isSelected = true
        return
    }
    gMeme.lines[currSelectedIdx].isSelected = false
    if (currSelectedIdx === 0) {
        gMeme.lines[gMeme.lines.length - 1].isSelected = true
    } else {
        gMeme.lines[currSelectedIdx - 1].isSelected = true
    }
}

function moveLine(line, toPos) {
    if (!line) return
    gMeme.lines[line.id - 1].pos.x = toPos.x
    gMeme.lines[line.id - 1].pos.y = toPos.y
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

function chooseMeme(memeIdx) {
    const meme = {
        ...gMemes[memeIdx]
    }
    gMeme = meme
    console.log('gMeme:', gMeme)
}

function getMemeLines() {
    return gMeme.lines
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

function addLine(text = 'Another Line') {
    gMeme.lines.push({
        id: genLineId(),
        text,
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
        isSelected: true,
        isDrag: false,
    })
}

function deleteLine() {
    const lineIdx = gMeme.lines.findIndex(line => line.isSelected)
    if (lineIdx < 0) return
    gMeme.lines.splice(lineIdx, 1)
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


function getEvPosLine(mouseX, mouseY, evType = '') {
    return gMeme.lines.find(line => {
        let actualLineX = 0
        let actualLineY = 0
        if (TOUCH_EVS.includes(evType)) {
            actualLineX = line.pos.x - line.sizes.width / 2
            actualLineY = gElCanvas.getBoundingClientRect().top + line.pos.y
            return (mouseX >= actualLineX && mouseX <= actualLineX + line.sizes.width &&
                mouseY >= actualLineY - line.sizes.height && mouseY <= actualLineY)
        } else {
            actualLineX = line.pos.x - line.sizes.width / 2
            return (
                mouseX >= actualLineX && mouseX <= actualLineX + line.sizes.width &&
                mouseY <= line.pos.y && mouseY >= line.pos.y - line.sizes.height
            )
        }
    })
}


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
            gMeme.lines[idx].pos.x = gMeme.lines[idx].sizes.width / 2 + 20
            break;
        case 'center':
            gMeme.lines[idx].pos.x = gElCanvas.width / 2
            break;
        case 'right':
            gMeme.lines[idx].pos.x = gElCanvas.width - gMeme.lines[idx].sizes.width / 2 - 20
            break;
        default:
            break;
    }
    gMeme.lines[idx].alignTo = action
}

function setLineFont(action, fontFamily) {
    let idx = getSelectedLineIdx()
    switch (action) {
        case 'family':
            gMeme.lines[idx].fontFamily = fontFamily
            break;
        case 'size+':
            gMeme.lines[idx].fontSize += 1
            break;
        case 'size-':
            gMeme.lines[idx].fontSize -= 1
            break;
        default:
            break;
    }
}



function saveMeme(imgDataURL) {
    gMeme.imgDataURL = imgDataURL
    gMemes.push(gMeme)
    saveToStorage(MEMES_DB_KEY, gMemes)
}

// EMOJIS



function _createEmojis() {
    for (let i = 128512; i < 128591; i++) {
        gEmojis.push(`${i}`)
    }
    for (let i = 129296; i < 129356; i++) {
        gEmojis.push(`${i}`)
    }
}

function nextPage() {
    gEmojiPageIdx++
    if (gEmojiPageIdx * PAGE_SIZE >= gEmojis.length) {
        gEmojiPageIdx = 0
    }
    return gEmojiPageIdx
}

function prevPage() {
    gEmojiPageIdx--
    if (gEmojiPageIdx * PAGE_SIZE < 0) {
        gEmojiPageIdx = Math.floor(gEmojis.length / PAGE_SIZE)
    }
    return gEmojiPageIdx
}


function getEmojis() {
    var emojis = gEmojis
    var startIdx = gEmojiPageIdx * PAGE_SIZE
    return emojis.slice(startIdx, startIdx + PAGE_SIZE)
}