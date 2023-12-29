import { EntityHealthComponent, EntityTypes, Player, system, world } from "@minecraft/server"

/**
 * 
 * @param {PlayerClass} player 
 */
export function updateHealth(player) {
    const actualHealth = player.getHealth()
    const maxHealth = player.getmaxHealth()

    const percentage = Math.floor(actualHealth/ maxHealth * 100)
    const hearts = Math.floor(percentage / 5)

    /**@type {EntityHealthComponent} */
    const comp = player.getComponent("health")
    //Log(`${percentage}|${hearts}|${actualHealth}`)
    comp.setCurrentValue(hearts)
}

world.afterEvents.entityHurt.subscribe((event) => {
    const player = event.hurtEntity
    if (!(player instanceof Player)) return
    updateHealth(player)
},{EntityTypes: ["minecraft:player"]})

world.afterEvents.entityHurt.subscribe((event) => {
    const { hurtEntity: player, damage, damageSource} = event
    if (!(player instanceof Player || !damageSource.damagingEntity)) return
    let resta = player.getHealth() - (damage).toFixed()
    player.setHealth(resta)  
    updateHealth(player)
}, {entityTypes: ["minecraft:player"]})

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        let maxHealth = player.getmaxHealth()
        let regen = player.getRegen()
        let BufoRegen = 0//player.getPlusRegen()
        player.setHealth((player.getHealth()+(maxHealth /100 * regen)*( BufoRegen + 1 )))
        updateHealth(player)
    })
},20)

