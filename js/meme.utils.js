'use strict'

function measureLineSizes(line) {
    let metrics = gCtx.measureText(line.text)
    return {
        width: gCtx.measureText(line.text).width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    }
}

function toggleEditor(linkTo = 'gallery') {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.toggle('show')
    // nav
    if (gIsSavedEditor) {
        gActualMemeImg.style.display = 'none'
        gIsSavedEditor = false
        setNavTo('saved')
    } else {
        setNavTo(linkTo)
    }
    // resetLines()
    // reset text line in editor
    const textLine = document.querySelector('.text-line')
    textLine.style.fontFamily = 'impact'
    textLine.value = ''
}

function setNavTo(linkTo) {
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    elNavlinks.find(elLink => elLink.dataset.trans === linkTo).classList.add('active')
}