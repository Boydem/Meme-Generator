'use strict'

let gElCanvas
let gCtx
let gIsDrag = false
let gElCurrMemeImg
// let gStrokeColor = document.querySelector('input[name="stroke"]').value
// let gFillColor = document.querySelector('input[name="fill"]').value
const TOUCH_EVS = ['touchmove', 'touchstart', 'touchend']

function renderMeme(elImg, lineIdx = 0) {
    gElCurrMemeImg = elImg
    resizeCanvas(elImg)
    renderImg(elImg)
    drawLine()
    showEditor()
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}


function drawLine() {
    const memeLines = getMemeLines()

    memeLines.forEach((line, idx) => {
        let pos = {
            x: gElCanvas.width / 2,
            y: 60
        }
        if (idx === 1) {
            pos.y = gElCanvas.height - 20
        }
        if (idx === memeLines.length - 1 && idx > 1 & !line.pos) {
            pos.y = getRandomInt(60, gElCanvas.height - 60)
            pos.x = getRandomInt(60, gElCanvas.width - 60)
            // pos.x = gElCanvas.width / 2
        } else if (idx > 1) {
            pos.y = line.pos.y
            pos.x = line.pos.x
        }


        gCtx.beginPath()

        gCtx.font = `${line.fontSize}px ${line.fontFamily}`
        gCtx.textAlign = line.alignTo
        gCtx.direction = 'ltr'

        gCtx.lineWidth = 8;
        gCtx.setLineDash([0, 0])
        gCtx.strokeStyle = line.strokeColor;
        gCtx.lineJoin = 'miter'
        gCtx.miterLimit = 2
        gCtx.strokeText(line.text, pos.x, pos.y)

        gCtx.fillStyle = line.fillColor;
        gCtx.fillText(line.text, pos.x, pos.y)
        gCtx.closePath()
        let metrics = gCtx.measureText(line.text)
        const lineSizes = {
            width: gCtx.measureText(line.text).width,
            height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        }
        if (idx === memeLines.length - 1) {
            saveLineSizes(idx, lineSizes)
            const lineActualX = pos.x - lineSizes.width / 2
            saveLinePosForRect(idx, {
                x: lineActualX,
                y: pos.y
            })
            saveLinePos(idx, pos)
        }
        if (line.isSelected) {
            gCtx.beginPath()
            gCtx.lineWidth = 2
            gCtx.strokeStyle = "white"
            gCtx.setLineDash([15, 5])
            gCtx.strokeRect(line.posForRect.x - 10, line.pos.y - lineSizes.height - 10, lineSizes.width + 25, lineSizes.height + 25)
        }
    })
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
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas(gElCurrMemeImg)
        renderImg(gElCurrMemeImg)
        drawLine()
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
    resetLines()
}

function showEditor() {
    const elEditor = document.querySelector('.meme-editor')
    elEditor.classList.add('show')
    elEditor.classList.remove('hide')
}

function onCanvasClick(ev) {
    const lineSizes = getLineSizes(0)
    const {
        offsetX,
        offsetY
    } = ev
    const currMeme = getCurrMeme()
    const line = currMeme.lines.find(line => {
        return (
            offsetX >= line.posForRect.x && offsetX <= line.posForRect.x + lineSizes.width &&
            offsetY <= line.posForRect.y && offsetY >= line.posForRect.y - lineSizes.height
        )
    })
    if (line) {
        selectLine(line)
        renderImg(gElCurrMemeImg)
        drawLine()
    } else {
        unselectLines()
        renderImg(gElCurrMemeImg)
        drawLine()
    }
}


// ON CONTROLS EVENTS

function onSetLineTxt(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    renderImg(gElCurrMemeImg)
    drawLine()
}

function onSwitchLine() {

}

function onAddLine() {
    addLine()
    const memeLines = getMemeLines()
    renderImg(gElCurrMemeImg)
    selectLine(memeLines[memeLines.length - 1])
    drawLine()
}

function onDeleteLine() {

}

function onSetColors(action, color) {
    switch (action) {
        case 'stroke':
            setColor('stroke', color)
            break;
        case 'fill':
            setColor('fill', color)
            break;
        default:
            break;
    }
    renderImg(gElCurrMemeImg)
    drawLine()
}

function onAlign(action) {
    switch (action) {
        case 'left':
            alignTo('left')
            break;
        case 'center':
            alignTo('center')
            break;
        case 'right':
            alignTo('right')
            break;
        default:
            break;
    }
    renderImg(gElCurrMemeImg)
    drawLine()
}

function onChangeFont(action, fontFamily) {
    switch (action) {
        case 'family':
            setLineFont(action, fontFamily)
            break;
        case 'size+':
            setLineFont(action)
            break;
        case 'size-':
            setLineFont(action)
            break;
        default:
            break;
    }
    renderImg(gElCurrMemeImg)
    drawLine()
}