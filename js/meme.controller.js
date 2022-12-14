'use strict'

let gElCanvas
let gCtx
let gIsDrag = false
let gElCurrMemeImg
// let gStrokeColor = document.querySelector('input[name="stroke"]').value
// let gFillColor = document.querySelector('input[name="fill"]').value
const TOUCH_EVS = ['touchmove', 'touchstart', 'touchend']

function renderMeme(img, elImg) {
    gElCurrMemeImg = elImg
    resizeCanvas(elImg)
    renderImg(elImg)
    drawLine()
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawLine() {
    let text = 'Hello World'
    let x = gElCanvas.width / 2
    let y = 50

    gCtx.beginPath()

    gCtx.font = '32px impact'
    gCtx.textAlign = 'center'
    gCtx.direction = 'ltr'

    gCtx.lineWidth = 3;
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(text, x, y)
    gCtx.fillStyle = 'white';
    gCtx.fillText(text, x, y)
}

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.clientHeight
    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas(gElCurrMemeImg)
        renderImg(gElCurrMemeImg)
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onMove(ev) {
    if (gIsDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gPrevPos.x
        const dy = pos.y - gPrevPos.y
        gPrevPos = pos
        draw(pos.x, pos.y, dx, dy)
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)
    gPrevPos = pos
    gIsDrag = true
}

function onUp() {
    gIsDrag = false
}

function clearCanvas() {
    gCtx.fillStyle = '#e9e9e9'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas(elImg) {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const imgH = elImg.offsetHeight
    const imgW = elImg.offsetWidth
    const canvasW = imgH * elCanvasContainer.offsetHeight / imgW
    gElCanvas.width = canvasW
    gElCanvas.height = getInnerHeight(elCanvasContainer)
}



function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX,
            y: ev.pageY
        }
    }
    return pos
}

function getInnerHeight(elm) {
    var computed = getComputedStyle(elm),
        padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);
    return elm.clientHeight - padding
}

function hideEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('hide')
    elEditor.classList.remove('show')
}

function showEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('show')
    elEditor.classList.remove('hide')
}