'use strict'

function onInit() {
    createInitImgs()
    renderGallery()
    initCanvas()
}

function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery')
    let images = getImgs()
    const strHTMLS = images.map(image => `<img onclick="onImageClick(${image.id},this)" src="${image.url}" class="meme-${image.id}" alt="">`)
    elGallery.innerHTML = strHTMLS.join('')
}

function onImageClick(imgId, elImg) {
    const img = getImgById(imgId)
    renderMeme(img, elImg)
    showEditor()
}