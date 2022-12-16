'use strict'


const gTrans = {
    gallery: {
        en: 'Gallery',
        he: `הגרליה`
    },
    editor: {
        en: 'Editor',
        he: `העורך`
    },
    saved: {
        en: 'Saved',
        he: 'השמורים',
    },
    filters: {
        en: 'Filters',
        he: 'הפילטרים',
    },
    'app-colors': {
        en: 'App colors:',
        he: 'הצבעים:'
    },
    upload: {
        en: 'Upload',
        he: 'העלאה'
    },
    fill: {
        en: 'Fill',
        he: 'המילוי'
    },
    stroke: {
        en: 'Stroke',
        he: 'המסגרת'
    },
    font: {
        en: 'Font',
        he: 'הפונט'
    },
    save: {
        en: 'Save',
        he: `לשמורים`
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    //  if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    //  get from gTrans
    var translation = key[gCurrLang]

    //  If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {

    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        //  support placeholder    
        if (el.placeholder) el.placeholder = translation
    })

}

function setLang(lang) {
    gCurrLang = lang
}

function getCurrLang() {
    return gCurrLang
}