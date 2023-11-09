
const CombatLog = {}

const Combat = {}

/**
 * Asigna el Combat Log
 * @param {mc.Player} player 
 * @param {mc.Player} enemy 
 */
Combat.setCombat = (player, enemy) => {
    CombatLog[player.name] = {
        time: Date.now() + 30000,
        enemy: enemy.name
    }
}

/**
 * Checa si el Player esta en Combat
 * @param {string} playerName
 */
Combat.isCombat = (playerName) => {
    if (!CombatLog[playerName]) return false
    if (Date.now() > CombatLog[playerName].time) return false
    return true
}

/**
 * Obten el Player Enemy
 * @param {string} playerName
 * @returns {string | undefined}
 */
Combat.getCombat = (playerName) => {
    return CombatLog[playerName]?.enemy
}

export default Combat