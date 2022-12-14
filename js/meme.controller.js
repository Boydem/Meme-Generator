'use strict'

let gElCanvas
let gCtx
let gIsDrag = false
// let gStrokeColor = document.querySelector('input[name="stroke"]').value
// let gFillColor = document.querySelector('input[name="fill"]').value
const TOUCH_EVS = ['touchmove', 'touchstart', 'touchend']

function renderMeme(elImg) {
    resizeCanvas(elImg)
    renderImg(elImg)
}
onInitCanvas()

function onInitCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.offsetHeight
    clearCanvas()
    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        clearCanvas()
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
    const imgH = elImg.height
    const imgW = elImg.width
    const canvasW = imgH * elCanvasContainer.offsetHeight / imgW
    gElCanvas.width = canvasW
    gElCanvas.height = getInnerHeight(elCanvasContainer)
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
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