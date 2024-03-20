import Action from "../Modules/Log/ActionLog"
import Combat from "../Modules/Server/Combat"
import Utility from "../Modules/Utilities/Utility"
import Config from "../Commands/Configuration"
import Untravel from "../Untravel"
import { system, world } from "@minecraft/server"

/**
 * validate if combat system is On
 * @returns boolean
 */
export const isCombatOn = () => {
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

Untravel.world.afterEvents.playerLeave.subscribe(({ playerName}) => {
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

const inventoryMap = new Map();
Untravel.world.beforeEvents.playerLeave.subscribe( (data) => {
    const player = data.player
    if (!isCombatOn()) return
    if (!Combat.isCombat(player.name)) return
    const playerName = player.name;
    const inventory = player.getComponent(`inventory`).container;
    const items = [];
    const dimension = player.dimension.id;
    const location = player.location;
    const logged = Combat.isCombat(player.name);
    const playerFind = Untravel.inv.get(player.name);
    //if (+clSettings.get(`bantime`) !== 0) {
    //    bannedplayers.set(`${player.id}`, `${Date.now() + +clSettings.get(`bantime`) * 1000}`);
    //}
    for (let i = 0; i < inventory.size; i++) {
        const item = inventory.getItem(i);
        if (item)
            items.push(item);
    }
    inventoryMap.set(player.name, items);
    system.run(() => {
        const playerData = inventoryMap.get(playerName);
        if (!playerData || logged === false)
            return;
        //try {
        //    world.getDimension(dimension).spawnItem(new ItemStack(`lifesteal:heart`), location);
        //}
        //catch { }
        for (const item of playerData) {
            world.getDimension(dimension).spawnItem(item, location);
        }
        for (const item of playerFind.items) {
            world.getDimension(dimension).spawnItem(item, location);
        }
        inventoryMap.delete(playerName);
    });
})