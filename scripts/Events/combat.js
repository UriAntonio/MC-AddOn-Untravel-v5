import Action from "../Modules/Log/ActionLog"
import Combat from "../Modules/Server/Combat"
import Utility from "../Modules/Utilities/Utility"
import Config from "../Commands/Configuration"
import Untravel from "../Untravel"

const isCombatOn = () => {
    return Untravel.Setting.get("combatSystem") ?? Config.combatSystem
}

Untravel.world.afterEvents.entityHurt.subscribe(async data => {
    if (!isCombatOn) return
    if (data.damageSource.cause == "none") return
    if (data.hurtEntity.typeId != "minecraft:player") return
    if (data.damageSource.damagingEntity == undefined || data.damageSource.damagingEntity.typeId != "minecraft:player") return
    if (data.damageSource.damagingEntity == data.hurtEntity) return

    let player1 = data.damageSource.damagingEntity
    let player2 = data.hurtEntity

    Combat.setCombat(player1, player2)
    Combat.setCombat(player2, player1)
})

Untravel.world.afterEvents.playerLeave.subscribe(({ playerName }) => {
    if (!isCombatOn()) return
    if (!Combat.isCombat(playerName)) return
    let enemyName = Combat.getCombat(playerName)
    let get = 0

    let playerMoney = Untravel.Money.getMoney(playerName)
    if (playerMoney > 3) {
        get = Math.floor(playerMoney / 3)
    }

    if (get <= 0) return
    Untravel.Money.setMoney(playerName, playerMoney - get)
    Untravel.Money.setMoney(enemyName, Untravel.Money.getMoney(enemyName) + get)

    if (Untravel.getPlayer(enemyName))
        Untravel.getPlayer(enemyName).sendMessage(`§a■§b${playerName} §3dejó el juego durante PVP con tigo, Obtuviste §b${Utility.formatMoney(get)}`)
})

Untravel.world.afterEvents.entityDie.subscribe((data) => {
    if (!isCombatOn()) return
    if (data.deadEntity.isValid() && data.deadEntity.typeId === "minecraft:player") {
        let player = data.deadEntity
        if (!Combat.isCombat(player.name)) return
        let enemyName = Combat.getCombat(player.name)
        let get = 0

        let playerMoney = Untravel.Money.getMoney(player.name)
        if (playerMoney > 3) {
            get = Math.floor(playerMoney / 3)
        }

        if (get <= 0) return
        Untravel.Money.setMoney(player.name, playerMoney - get)
        Untravel.Money.setMoney(enemyName, Untravel.Money.getMoney(enemyName) + get)


        player.sendMessage(`§a■§3Has muerto y perdiste: §b${Utility.formatMoney(get)}`)
        let enemy = Untravel.getPlayer(enemyName)
        Action.addAction(enemy, 3, `§3Obtuviste §b${Utility.formatMoney(get)}`)
    }
})

