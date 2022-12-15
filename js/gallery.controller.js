'use strict'

function onInit() {
    createInitImgs()
    renderGallery()
    initCanvas()
}

function onHamburgerBtnToggle() {
    document.querySelector('.main-nav').classList.toggle('open')
}

function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery')
    let images = getImgs()
    const strHTMLS = images.map(image => `<img onclick="onImageClick(this)" src="${image.url}" class="meme-${image.id}" alt="">`)
    elGallery.innerHTML = strHTMLS.join('')
}

function onImageClick(elImg) {
    setImg(elImg)
    renderMeme()
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