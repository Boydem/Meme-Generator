'use strict'

let gFilterBy = null

let gImgs = [
    ['black', 'cool', 'matrix'],
    ['dancing', 'happy', 'cute'],
    ['funny', 'xmen', 'giggle'],
    ['funny', 'cat'],
    ['baby', 'strong'],
    ['toy', 'worried'],
    ['animals', 'funny', 'cute', 'dogs'],
    ['funny', 'clown'],
    ['funny', 'midget', 'baby'],
    ['funny', 'baby'],
    ['kissing', 'strong'],
    ['man', 'crazy'],
    ['crazy', 'funny'],
    ['black', 'man', 'funny', 'cute', 'baby'],
    ['white', 'man', 'trump', 'ugly'],
    ['black', 'baby', 'funny', 'busted'],
    ['animals', 'dogs', 'cute', 'funny'],
    ['black', 'funny', 'obama'],
    ['black', 'kissing', 'strong', 'man'],
    ['handsome', 'wine'],
    ['trump', 'politics'],
    ['white', 'man'],
    ['black', 'politics', 'funny', 'busted'],
    ['putin', 'boring', 'ugly', 'busted'],

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

function getImg(imgIdx) {
    return {
        ...gImgs[imgIdx]
    }
}

// function getImgById(imgId) {
//     return gImgs.find(img => img.id === imgId)
// }

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