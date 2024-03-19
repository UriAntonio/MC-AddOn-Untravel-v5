import Config from "../Commands/Configuration.js"
import Untravel from "../Untravel.js"
import Utility from "../Modules/Utilities/Utility.js"
import Action from "../Modules/Log/ActionLog.js"

Untravel.world.afterEvents.entityDie.subscribe( async data => {
    if (!(Untravel.Setting.get("earnMoneyfromMobs") ?? Config.earnMoneyfromMobs)) return
    if (data.damageSource.cause == "none") return
    if (data.damageSource.damagingEntity == undefined || data.damageSource.damagingEntity.typeId != "minecraft:player") return
    let deadEntity = data.deadEntity
    let player = data.damageSource.damagingEntity
    
    let entity = Config.moneyFromMobs[deadEntity.typeId]
    if (!entity) return
    let moneyEarn = Utility.random(entity[0], entity[1])
    if (player.getMoney() + moneyEarn > Untravel.Money.getMaxMoney()) moneyEarn = Untravel.Money.getMaxMoney() - player.getMoney()
    if (moneyEarn <= 0) return
    await player.setMoney(player.getMoney() + moneyEarn)
    Action.addAction(player, 3,`§3Obtiviste §b${Utility.formatMoney(moneyEarn)}`)
})

Untravel.world.afterEvents.entityDie.subscribe((event) => {
    const { deadEntity: entity } = event
    const player = event.damageSource.damagingEntity
    if (!(entity.isValid())) return
    if (event.damageSource.cause == 'suicide') return
    if (entity.getDynamicProperty("stack") >= 1){
        let newentity = entity.dimension.spawnEntity(entity.typeId, entity.location)
        newentity.setDynamicProperty("stack",entity.getDynamicProperty("stack") - 1)
    }
})