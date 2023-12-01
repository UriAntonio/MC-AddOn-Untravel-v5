import Config from "../conf/Configuration"
import Server from "../server"
import Utility from "../Modules/Utilities/Utility"
import Action from "../Modules/Log/ActionLog"

Server.world.afterEvents.entityDie.subscribe( async data => {
    if (!(Server.Setting.get("earnMoneyfromMobs") ?? Config.earnMoneyfromMobs)) return
    if (data.damageSource.cause == "none") return
    if (data.damageSource.damagingEntity == undefined || data.damageSource.damagingEntity.typeId != "minecraft:player") return
    let deadEntity = data.deadEntity
    let player = data.damageSource.damagingEntity
    
    let entity = Config.moneyFromMobs[deadEntity.typeId]
    if (!entity) return
    let moneyEarn = Utility.random(entity[0], entity[1])
    if (player.getMoney() + moneyEarn > Server.Money.getMaxMoney()) moneyEarn = Server.Money.getMaxMoney() - player.getMoney()
    if (moneyEarn <= 0) return
    await player.setMoney(player.getMoney() + moneyEarn)
    Action.addAction(player, 3,`§3Obtiviste §b${Utility.formatMoney(moneyEarn)}`)
})