'use strict'

const MEMES_DB_KEY = 'memesDB'

let gMemes = loadFromStorage(MEMES_DB_KEY) || []

let gMeme = {
    selectedImg: {},
    selectedLineIdx: 0,
    lines: [{
        text: 'Your Text Here',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
    }]
}

// EMOJIS
let gEmojis = []
_createEmojis()
var gEmojiPageIdx = 0
const PAGE_SIZE = 20

function selectLine(lineIdx = null) {
    if (lineIdx < 0) return
    gMeme.selectedLineIdx = lineIdx
}

function setMemeImg(img) {
    gMeme.selectedImg = img
}

function getSelectedLine() {
    return {
        ...gMeme.lines[gMeme.selectedLineIdx]
    }
}

function unselectLines() {
    gMeme.selectedLineIdx = null
}

function resetMemeLines() {
    gMeme.lines = [{
        text: 'Your Text Here',
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
    }]
}

function switchLine() {
    if (!gMeme.lines.length) return
    const currSelectedIdx = gMeme.selectedLineIdx
    if (currSelectedIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        return
    }
    if (currSelectedIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    } else {
        gMeme.selectedLineIdx += 1
    }
}

function moveLine(toPos) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = toPos.x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = toPos.y
}

function getCurrMeme() {
    return {
        ...gMeme
    }
}

function chooseMeme(memeIdx) {
    gMeme = {
        ...gMemes[memeIdx]
    }
}

function getMemeLines() {
    return gMeme.lines
}

function saveLineProperties(lineSizes, pos) {
    saveLineSizes(lineSizes)
    saveLinePos(pos)
}

function saveLinePos(pos) {
    if (!pos) return
    gMeme.lines[gMeme.selectedLineIdx].pos = {
        ...pos
    }
}

function saveLineSizes(lineSizes) {
    if (!lineSizes) return
    gMeme.lines[gMeme.selectedLineIdx].sizes = {
        ...lineSizes
    }
}

function getLineByIdx(lineIdx) {
    if (lineIdx < 0) return
    return {
        ...gMeme.lines[lineIdx]
    }
}

function setLineTxt(text) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) {
        flashMsg('Must select a line first')
        return
    }
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function addLine(text = 'Another Line') {
    gMeme.lines.push({
        text,
        fontSize: 48,
        strokeColor: 'black',
        fillColor: 'white',
        alignTo: 'center',
        fontFamily: 'impact',
    })
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

// EDITOR SERVICE

function setColor(action, color) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) {
        flashMsg('Must select a line first')
        return
    }
    switch (action) {
        case 'stroke':
            line.strokeColor = color
            break;
        case 'fill':
            line.fillColor = color
            break;
        default:
            break;
    }
}

function alignTo(action) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) {
        flashMsg('Must select a line first')
        return
    }
    switch (action) {
        case 'left':
            line.pos.x = line.sizes.width / 2 + 20
            break;
        case 'center':
            line.pos.x = gElCanvas.width / 2
            break;
        case 'right':
            line.pos.x = gElCanvas.width - line.sizes.width / 2 - 20
            break;
        default:
            break;
    }
    line.alignTo = action
}

function setLineFont(action, fontFamily) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) {
        flashMsg('Must select a line first')
        return
    }
    switch (action) {
        case 'family':
            line.fontFamily = fontFamily
            break;
        case 'size+':
            line.fontSize += 2
            break;
        case 'size-':
            line.fontSize -= 2
            break;
        default:
            break;
    }
}

function saveMeme(imgDataURL) {
    gMeme.imgDataURL = imgDataURL
    if (gIsSavedEditor) {
        let memeIdx = gMemes.findIndex(meme => meme.savedMemeId === gMeme.savedMemeId)
        gMemes[memeIdx] = {
            ...gMeme
        }
    } else {
        gMeme.savedMemeId = makeId()
        gMemes.push(gMeme)
    }
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