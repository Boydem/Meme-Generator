'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery')
    let imgStrHTML = ``
    for (let i = 1; i <= 17; i++) {
        imgStrHTML += `<img onclick="onImageClick(this)" src="images/meme-imgs (square)/${i}.jpg" alt="">`
    }
    elGallery.innerHTML = imgStrHTML
}

function onImageClick(elImg) {
    renderMeme(elImg)
    showEditor()
}