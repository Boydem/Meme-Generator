'use strict'

let gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

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

let gKeyWords = ['funny', 'cat', 'baby', 'cute', 'animals']

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

function getImgs() {
    return gImgs
}