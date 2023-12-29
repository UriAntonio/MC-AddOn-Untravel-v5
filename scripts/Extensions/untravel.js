const {fromCodePoint} = String

const untravel = {
    symbols: {
        heart: fromCodePoint(0xE300),
        mana: fromCodePoint(0xE301),
        Chalenger : fromCodePoint(0xE302),
        Bronze: fromCodePoint(0xE307),
        trash: fromCodePoint(0xE308)
    },
    standar: {
        actualHealth: 100,
        maxHealth: 100,
        actualMana: 50,
        maxMana: 50,
        actualRegen: 2
    }
}

export default untravel