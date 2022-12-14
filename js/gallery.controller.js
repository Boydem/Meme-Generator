'use strict'

function onInit() {
    createInitImgs()
    renderGallery()
    initCanvas()
}

function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery')
    let images = getImgs()
    const strHTMLS = images.map(image => `<img onclick="onImageClick(this)" src="${image.url}" class="meme-${image.id}" alt="">`)
    elGallery.innerHTML = strHTMLS.join('')
}

function onImageClick(elImg) {
    renderMeme(elImg)
}

function onSetAppColors(action, color) {
    switch (action) {
        case 'clr1':
            setColor('stroke', color)
            document.documentElement.style.setProperty('--app-clr2', hexToRgb(color).join(','))
            break;
        case 'clr2':
            setColor('fill', color)
            document.documentElement.style.setProperty('--app-clr1', hexToRgb(color).join(','))
            break;
        default:
            break;
    }
    document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');
}

function hexToRgb(hex, result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)) {
    return result ? result.map(i => parseInt(i, 16)).slice(1) : null
    //returns [23, 14, 45] -> reformat if needed
}