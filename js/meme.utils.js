'use strict'

function measureLineSizes(line) {
    let metrics = gCtx.measureText(line.text)
    return {
        width: gCtx.measureText(line.text).width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    }
}

function hideEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('hide')
    elEditor.classList.remove('show')
    resetLines()
    // reset text line in editor
    const textLine = document.querySelector('.text-line')
    textLine.style.fontFamily = 'impact'
    textLine.value = ''
}

function showEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('show')
    elEditor.classList.remove('hide')
}