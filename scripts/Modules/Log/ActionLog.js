//Registro
const ActionLog = {}

//Modulo
const Action = {}


/**
 * Asigna el Mensaje Log
 * @param {mc.Player} player 
 * @param {number} line
 * @param {string} msg 
 */
Action.setAction = (player, line, msg) => {
    ActionLog[player.name] = {
        time: Date.now() + 2000,
        line: line,
        msg: msg
    }
    console.warn(`se registro: ${player.name}| ${line}| ${msg}`)
}


/**
 * Checa si el Player tiene msg
 * @param {string} playerName
 */
Action.hasMsg = (playerName) => {
    if (!ActionLog[playerName]) return false
    if (Date.now() > ActionLog[playerName].time) return false
    return true
}

/**
 * Obten el Mensaje
 * @param {string} playerName
 * @returns {string | undefined}
 */
Action.getActionMsg = (playerName,) => {
    return ActionLog[playerName]?.msg
}

export default Action