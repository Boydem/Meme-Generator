'use strict'

let gFilterBy = null

let gImgs = [
    ['trump', 'ugly', 'american'],
    ['cute', 'animals'],
    ['cute', 'animals', 'baby'],
    ['funny', 'cat'],
    ['baby', 'strong'],
    ['something'],
    ['baby', 'funny'],
    ['funny', 'clown'],
    ['funny', 'midget', 'baby'],
    ['funny', 'obama'],
    ['kissing', 'strong'],
    ['you', 'crazy'],
    ['handsome', 'wine'],
    ['black', 'man'],
    ['white', 'man'],
    ['white', 'man', 'funny', 'busted'],
    ['putin', 'boring'],
    ['handsome', 'wine'],
    ['black', 'man'],
    ['white', 'man'],
    ['white', 'man', 'funny', 'busted'],
    ['putin', 'boring'],
    ['handsome', 'wine'],
    ['black', 'man'],
    ['white', 'man']
]

let gKeywordSearchCountMap = getKeyWordsMap()
let gKeyWords = getKeyWords()


function getKeyWords() {
    let keywords = gImgs.reduce((acc, imgKeys) => {
        imgKeys.forEach(key => {
            if (!acc.includes(key)) {
                acc.push(key)
            }
        })
        return acc
    }, [])
    return keywords
}

function getKeyWordsMap() {
    let keywordsMap = gImgs.reduce((acc, imgKeys) => {
        imgKeys.forEach(key => {
            if (!acc[key]) {
                acc[key] = 1
            } else {
                acc[key] += 1
            }
        })
        return acc
    }, {})
    return keywordsMap
}

function createInitImgs() {
    gImgs = gImgs.reduce((acc, img, id) => {
        acc.push({
            id: id + 1,
            url: `images/meme-imgs (various aspect ratios)/${id+1}.jpg`,
            keywords: img
        })
        return acc
    }, [])
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function setFilterBy(value) {
    gFilterBy = value
}

function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => {
        const x = img.keywords.filter(keyword => {
            return keyword.includes(gFilterBy)
        })
        return x.includes(gFilterBy)
    })
}