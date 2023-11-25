import Action from "../Modules/Log/ActionLog"
import Combat from "../Modules/Server/Combat"
import Utility from "../Modules/Utilities/Utility"
import Config from "../conf/Configuration"
import Server from "../server"

const isCombatOn = () => {
    return Server.Setting.get("combatSystem") ?? Config.combatSystem
}

Server.world.afterEvents.entityHurt.subscribe(async data => {
    if (!isCombatOn) return
    if (data.damageSource.cause == "none") return
    if (data.hurtEntity.typeId != "minecraft:player") return
    if (data.damageSource.damagingEntity == undefined || data.damageSource.damagingEntity.typeId != "minecraft:player") return
    if (data.damageSource.damagingEntity == data.hurtEntity) return

    let player1 = data.damageSource.damagingEntity
    let player2 = data.hurtEntity

    console.warn(`${player1.name} hit ${player2.name}`)
    Combat.setCombat(player1, player2)
    Combat.setCombat(player2, player1)
})

Server.world.afterEvents.playerLeave.subscribe(({ playerName }) => {
    if (!isCombatOn()) return
    if (!Combat.isCombat(playerName)) return
    let enemyName = Combat.getCombat(playerName)
    let get = 0

    let playerMoney = Server.Money.getMoney(playerName)
    if (playerMoney > 3) {
        get = Math.floor(playerMoney / 3)
    }

    if (get <= 0) return
    Server.Money.setMoney(playerName, playerMoney - get)
    Server.Money.setMoney(enemyName, Server.Money.getMoney(enemyName) + get)

    if (Server.getPlayer(enemyName))
        Server.getPlayer(enemyName).sendMessage(`§a■§b${playerName} §3dejó el juego durante PVP con tigo, Obtuviste §b${Utility.formatMoney(get)}`)
})

Server.world.afterEvents.entityDie.subscribe((data) => {
    if (!isCombatOn()) return
    if (data.deadEntity.isValid() && data.deadEntity.typeId === "minecraft:player") {
        let player = data.deadEntity
        if (!Combat.isCombat(player.name)) return
        let enemyName = Combat.getCombat(player.name)
        let get = 0

        let playerMoney = Server.Money.getMoney(player.name)
        if (playerMoney > 3) {
            get = Math.floor(playerMoney / 3)
        }

        if (get <= 0) return
        Server.Money.setMoney(player.name, playerMoney - get)
        Server.Money.setMoney(enemyName, Server.Money.getMoney(enemyName) + get)


        player.sendMessage(`§a■§3Has muerto y perdiste: §b${Utility.formatMoney(get)}`)
        let enemy = Server.getPlayer(enemyName)
        Action.setAction(enemy, 3, `§3Obtuviste §b${Utility.formatMoney(get)}`)
    }
})


Server.System.runInterval(() => {
    if (!isCombatOn) return

    Server.world.getAllPlayers().forEach(player => {
        //console.log(`${player}`)
        let fisrtLine
        let line2
        let line3
        if (Combat.stopCombat(player.name))
            Server.System.run(() => player.sendMessage(`§a■§aYa no estas en combate`))
        if (Combat.isCombat(player.name)) {
            let enemyName = Combat.getCombat(player.name)
            fisrtLine = `§cEstas en combate con:§4${enemyName}\n§cDesconectarse contará como muerte`

        }
        if (Action.hasMsg(player.name)) {
            line3 = Action.getActionMsg(player.name,)

        }
        Server.actionBar(player, fisrtLine, line2, line3)

    })

}, 20)

