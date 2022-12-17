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
    const strHTMLS = images.map(image => `<img onclick="onImageClick(this.dataset.id)" src="${image.url}" data-id="${image.id}" alt="">`)
    gElGalleryContainer.innerHTML = strHTMLS.join('')
}

function renderSaved() {
    if (!gMemes.length) return
    const strHTMLS = gMemes.map((meme, idx) => `<img onclick="onSavedClick(this.dataset.id,${idx})" src="${meme.imgDataURL}" data-id="${meme.selectedImgId}" alt="">`)
    gElGalleryContainer.innerHTML = strHTMLS.join('')
}

function onSavedClick(imgId, memeIdx) {
    chooseMeme(memeIdx)
    renderGallery()
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    elNavlinks.find(elLink => elLink.dataset.trans === 'editor').classList.add('active')
    renderMeme(imgId, gMemes[memeIdx])
}

function onImageClick(imgId) {
    resetMeme()
    const elNavlinks = Array.from(document.querySelectorAll('.nav-link'))
    elNavlinks.find(elLink => elLink.classList.contains('active')).classList.remove('active')
    elNavlinks.find(elLink => elLink.dataset.trans === 'editor').classList.add('active')
    // setImg(elImg)
    renderMeme(imgId, getCurrMeme())
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
    setFilterBy(null)
    if (!gMemes.length) return
    hideEditor(elLink.dataset.trans)
    renderSaved()
}

function onEditorBtnNav(elLink) {
    setFilterBy(null)
    if (!gElCurrMemeImg) return
    drawImg(gElCurrMemeImg)
    resizeCanvas(gElCurrMemeImg)
    showEditor()
}

function onGalleryBtnNav(elLink) {
    showAllGallery()
    hideEditor(elLink.dataset.trans)
    renderGallery()
}

// Keywords
renderKeywords()

function renderKeywords() {
    const elKeywordsWrapper = document.querySelector('.keywords')
    const keywords = getKeyWords()
    const strHTMLS = keywords.map(key => `<span onclick="onSetFilterBy('${key}')" data-pop="${key}" class="keyword">${key}</span>`)
    elKeywordsWrapper.innerHTML = strHTMLS.join('')
}

function onSetFilterBy(keyword) {
    setFilterBy(keyword)
    renderGallery()
}

function showAllGallery() {
    setFilterBy(null)
    renderGallery()
}