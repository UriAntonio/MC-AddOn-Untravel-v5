import { LogWarn } from "./Log"

//Registro
const ActionLog = {}

//Modulo
const Action = {}

const ActionStructure = {
    time: Number.prototype,
    msg: Array.prototype
}

const ActionList = {
    line1: 1,
    line2: 2,
    line3: 3
}

/**
 * Asigna el Mensaje Log en la linea
 * @name {ActionStructure} name
 * @param {mc.Player} player 
 * @param {number} line
 * @param {string} msg 
 */
Action.setAction = (player, line, msg) => {
    ActionLog[`${player.name}-${line}`] = {
        time: Date.now() + 2000,
        msg: [msg]
    }
}

/**
 * Agrega el Mensaje Log en la linea especifica
 * @param {mc.Player} player 
 * @param {number} line
 * @param {string} msg 
 */
Action.addAction = (player, line, msg) => {
    if (!ActionLog[`${player.name}-${line}`]) {
        Action.setAction(player, line, msg)
        return
    }
    let oldMsg = ActionLog[`${player.name}-${line}`].msg
    if (Date.now() <= ActionLog[`${player.name}-${line}`].time) {
    oldMsg.push(msg)
    ActionLog[`${player.name}-${line}`].msg = oldMsg
    //LogWarn(`${oldMsg}`)
    return
    }
    Action.setAction(player, line, msg)

}


/**
 * Checa si el Player tiene msg
 * @param {string} playerName
 * @param {number} line
 */
Action.hasMsg = (playerName, line) => {
    if (!ActionLog[`${playerName}-${line}`]) return false
    if (Date.now() > ActionLog[`${playerName}-${line}`].time) return false
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

Action.getLineMsg = (playerName, line) => {
    let msgArr
    let stringMsg
    let finalMsg
    switch (line) {
        case ActionList.line1:
            msgArr = ActionLog[`${playerName}-${line}`]?.msg
            stringMsg = msgArr.toString()
            finalMsg = stringMsg.replace(",", " ")
            return finalMsg
            break;
        case ActionList.line2:
            msgArr = ActionLog[`${playerName}-${line}`]?.msg
            stringMsg = msgArr.toString()
            finalMsg = stringMsg.replace(",", " ")
            return finalMsg
            break;
        case ActionList.line3:
            msgArr = ActionLog[`${playerName}-${line}`]?.msg
            stringMsg = msgArr.toString()
            finalMsg = stringMsg.replace(",", " ")
            return finalMsg
            break;
        default:
            break;
    }
}

export default Action