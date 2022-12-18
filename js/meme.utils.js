'use strict'

function measureLineSizes(line) {
    let metrics = gCtx.measureText(line.text)
    return {
        width: gCtx.measureText(line.text).width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    }
}

function toggleEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.toggle('show')
    // resetLines()
    // reset text line in editor
    const textLine = document.querySelector('.text-line')
    textLine.style.fontFamily = 'impact'
    textLine.value = ''
}

function hideEditor(linkTo = 'gallery') {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.remove('show')
    if (gIsSavedEditor) {
        gIsSavedEditor = false
        setNavTo('saved')
    } else {
        setNavTo(linkTo)
    }
}

function setNavTo(linkTo) {
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    elNavlinks.find(elLink => elLink.dataset.trans === linkTo).classList.add('active')
}