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
        actualHealth: 20,
        maxHealth: 20,
        actualMana: 0,
        maxMana: 0,
        actualRegen: 2
    }
}

export default untravel