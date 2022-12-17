'use strict'

function measureLineSizes(line) {
    let metrics = gCtx.measureText(line.text)
    return {
        width: gCtx.measureText(line.text).width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    }
}

function hideEditor(linkTo = 'gallery') {
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    if (gIsSavedEditor) {
        gActualMemeImg.style.display = 'none'
        gIsSavedEditor = false
        elNavlinks.find(elLink => elLink.dataset.trans === 'saved').classList.add('active')
    } else {
        elNavlinks.find(elLink => elLink.dataset.trans === linkTo).classList.add('active')
    }
    const elEditor = document.querySelector('.meme-editor')
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
}