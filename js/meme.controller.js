'use strict'

let gElCanvas
let gCtx
let gIsDrag = false
let gElCurrMemeImg
let gPrevPos
let gDraggedLine

const TOUCH_EVS = ['touchmove', 'touchstart', 'touchend']

function initCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth
    gElCanvas.height = elCanvasContainer.clientHeight
    addListeners()
}

function renderMeme() {
    const memeLines = getMemeLines()
    resizeCanvas(gElCurrMemeImg)
    renderCanvas()
    selectLine(memeLines[0])
    drawRect(memeLines[0])
    showEditor()
}
// Every time canvas render redraw img and lines
function renderCanvas() {
    drawImg(gElCurrMemeImg)
    drawLines()
}
// draw img
function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
// draw line
function drawLines() {
    const memeLines = getMemeLines()

    memeLines.forEach((line, idx) => {
        let pos = {}
        // if line already have position , place it there else init line pos
        if (line.pos) {
            pos = {
                x: line.pos.x,
                y: line.pos.y
            }
        } else {
            // first line pos
            pos = {
                x: gElCanvas.width / 2,
                y: 60
            }
            // seconds line pos
            if (idx === 1) {
                pos.y = gElCanvas.height - 20
            }
            // more then two lines pos
            if (idx === memeLines.length - 1 && idx > 1 & !line.pos) {
                pos.y = getRandomInt(60, gElCanvas.height - 60)
                pos.x = getRandomInt(60, gElCanvas.width - 60)
                // pos.x = gElCanvas.width / 2
            } else if (idx > 1) {
                pos.y = line.pos.y
                pos.x = line.pos.x
            }
        }


        // draw line
        gCtx.beginPath()
        // font
        gCtx.font = `${line.fontSize}px ${line.fontFamily}`
        gCtx.textAlign = line.alignTo
        gCtx.direction = 'ltr'
        // stroke
        gCtx.lineWidth = 8;
        gCtx.setLineDash([0, 0])
        gCtx.strokeStyle = line.strokeColor;
        gCtx.lineJoin = 'miter'
        gCtx.miterLimit = 2
        gCtx.strokeText(line.text, pos.x, pos.y)
        // fill
        gCtx.fillStyle = line.fillColor;
        gCtx.fillText(line.text, pos.x, pos.y)
        gCtx.closePath()
        // save line pos for resize *and* pos for selection rect *and* measureText dimensions for calculations
        const lineSizes = measureLineSizes(line)
        if (idx === memeLines.length - 1) {
            saveLineSizes(idx, lineSizes)
            const lineActualX = pos.x - lineSizes.width / 2
            saveLinePosForRect(idx, {
                x: lineActualX,
                y: pos.y
            })
            saveLinePos(idx, pos)
        }
        // draw selection rectangle if line isSelected
        if (line.isSelected) {
            drawRect()
        }
    })
}
// draw rect
function drawRect() {
    const line = getSelectedLine()
    if (!line) return
    if (line.isSelected) {
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = "white"
        gCtx.setLineDash([15, 5])
        gCtx.strokeRect(line.posForRect.x - 10, line.pos.y - line.sizes.height - 10, line.sizes.width + 25, line.sizes.height + 25)
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas(gElCurrMemeImg)
        renderCanvas()
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

function getEvPosLine(ev) {
    const {
        offsetX,
        offsetY
    } = ev
    const currMeme = getCurrMeme()
    // here im using posForRect thats the top left corner of the text
    return currMeme.lines.find(line => {
        return (
            offsetX >= line.posForRect.x && offsetX <= line.posForRect.x + line.sizes.width &&
            offsetY <= line.posForRect.y && offsetY >= line.posForRect.y - line.sizes.height
        )
    })
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

function onCanvasClick(ev) {
    ev.stopPropagation()
    const line = getEvPosLine(ev)
    if (line) {
        selectLine(line)
        renderCanvas()
        drawRect()
    } else {
        unselectLines()
        renderCanvas()
        drawRect()
    }
}

function onMove(ev) {
    ev.stopPropagation()
    const line = getSelectedLine()
    if (!line) return
    if (line.isSelected) {
        const pos = getEvPos(ev)
        // const dx = pos.x - line.pos.x
        // const dy = pos.y - line.pos.y
        const newPos = {
            x: pos.x,
            y: pos.y + line.sizes.height / 2
        }
        moveLine(line, newPos)
        renderCanvas()
        drawRect()
    }
}

function onDown(ev) {
    ev.stopPropagation()
    const line = getEvPosLine(ev)
    selectLine(line)
    gDraggedLine = line
    allowDrag(line)
}

function onUp(ev) {
    ev.stopPropagation()
    const line = getEvPosLine(ev)
    disableDrag(gDraggedLine)
}

function clearCanvas() {
    gCtx.fillStyle = '#e9e9e9'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas(elImg) {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const imgH = elImg.offsetHeight
    const imgW = elImg.offsetWidth
    if (imgW < imgH) {
        const canvasW = imgH * elCanvasContainer.offsetHeight / imgW
        gElCanvas.width = canvasW
        gElCanvas.height = getInnerHeight(elCanvasContainer)
    } else {
        const canvasH = imgH * elCanvasContainer.offsetWidth / imgW
        gElCanvas.width = elCanvasContainer.offsetWidth
        gElCanvas.height = canvasH
    }
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



// ON CONTROLS EVENTS

function disableControls() {

}

function onSetLineTxt(ev) {
    const txt = ev.target.value
    setLineTxt(txt)
    renderCanvas()
}

function onSwitchLine() {
    switchLine()
    renderCanvas()
    drawRect()
}

function onAddLine() {
    addLine()
    const memeLines = getMemeLines()
    selectLine(memeLines[memeLines.length - 1])
    renderCanvas()
    drawRect(memeLines[memeLines.length - 1])
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
    drawRect()
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
    renderCanvas()
    drawRect()
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
    renderCanvas()
    drawRect()
}

function onChangeFont(action, elFontInput) {
    switch (action) {
        case 'family':
            elFontInput.style.fontFamily = elFontInput.value
            document.querySelector('.text-line').style.fontFamily = elFontInput.value
            setLineFont(action, elFontInput.value)
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
    renderCanvas()
    drawRect()
}

// END OF FLOW => SHARE / DOWNLOAD

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL('image/png')
    elLink.href = data
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}