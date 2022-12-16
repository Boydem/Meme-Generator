'use strict'

const gElGalleryContainer = document.querySelector('.meme-gallery')

function onInit() {
    createInitImgs()
    renderGallery()
    initCanvas()
}

function onSetLang(elLang) {
    const lang = elLang.dataset.lang
    setLang(lang)
    doTrans()
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    // setTimeout(() => {

    // }, 500)

}

function onHamburgerBtnToggle() {
    document.querySelector('.main-nav').classList.toggle('open')
}

function renderGallery() {
    let images = getImgs()
    const strHTMLS = images.map(image => `<img onclick="onImageClick(this)" src="${image.url}" id="${image.id}" alt="">`)
    gElGalleryContainer.innerHTML = strHTMLS.join('')
}

function renderSaved() {
    if (!gMemes.length) return
    const strHTMLS = gMemes.map(meme => `<img onclick="onSavedClick(this)" src="${meme.imgDataURL}" id="${meme.selectedImgId}" alt="">`)
    gElGalleryContainer.innerHTML = strHTMLS.join('')
}

function onImageClick(elImg) {
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    elNavlinks.find(elLink => elLink.dataset.trans === 'editor').classList.add('active')

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

function onSavedBtnNav(elLink) {
    if (!gMemes.length) return
    hideEditor(elLink.dataset.trans)
    renderSaved()
}

function onGalleryBtnNav(elLink) {
    hideEditor(elLink.dataset.trans)
    renderGallery()
}