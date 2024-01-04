const {fromCodePoint} = String

const untravel = {
    symbols: {
        coin: fromCodePoint(0xE102),
        heart: fromCodePoint(0xE300),
        mana: fromCodePoint(0xE301),
        Chalenger : fromCodePoint(0xE302),
        Bronze: fromCodePoint(0xE307),
        trash: fromCodePoint(0xE308),
        myPoint: fromCodePoint(0xE30E),
        portal: fromCodePoint(0xE380),
        whiteConfig: fromCodePoint(0xE387),
        equis: fromCodePoint(0xE391),
        less: fromCodePoint(0xE39A),
        plus: fromCodePoint(0xE39C),
    },
    standar: {
        actualHealth: 20,
        maxHealth: 20,
        actualMana: 0,
        maxMana: 0,
        actualRegen: 2
    }
}

export default untravel