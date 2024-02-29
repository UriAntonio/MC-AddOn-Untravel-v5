import Untravel from '../Untravel';
import Config from '../conf/Configuration';
import { LogWarn } from '../Modules/Log/Log';
import untravel from '../Extensions/untravel';
import Combat from '../Modules/Server/Combat';
import Action from '../Modules/Log/ActionLog';

const { heart, mana } = untravel.symbols

Untravel.System.runInterval(() => {
    Untravel.world.getAllPlayers().forEach(player => {
        let gms = "survival"
        //gamemode s @a[m=1,tag=!Adminer]
        if ((player.gamemode == "creative") && !player.hasTag(Config.gmc)) {
            player.gamemode = gms
            LogWarn(`${player.name} estaba en creativo!!!`)
        }

    })
}, 20)

// Untravel.System.runInterval(() => {
//     Database.set("coliseoManager", true)
// }, 3000)

/**
 * @param {import{@minecraft/server}.Player}
 */
Untravel.System.runInterval(() => {
    Untravel.world.getAllPlayers().forEach(player => {
        let line0
        let fisrtLine
        let line2
        let line3
        let formatedHealth = player.getformatedHealth()
        let maxHealth = player.getmaxHealth()
        let maxMana = player.getmaxMana()
        let actualMana = player.getMana()
        line0 = `${heart}§c${formatedHealth}/${maxHealth} ${mana}§b${actualMana}/${maxMana}`
        if (Combat.isCombat(player.name)) {
            let enemyName = Combat.getCombat(player.name)
            fisrtLine = `§cEstas en combate con:§4${enemyName}\n§cDesconectarse contará como muerte`
        }
        if (Action.hasMsg(player.name, 2)) {
            line2 = Action.getLineMsg(player.name, 2)
        }
        if (Action.hasMsg(player.name, 3)) {
            line3 = Action.getLineMsg(player.name, 3)
        }
        Untravel.actionBar(player, line0, fisrtLine, line2, line3)

    })

})


Untravel.System.runInterval(() => {
    if (!isCombatOn) return

    Untravel.world.getAllPlayers().forEach(player => {        
        if (Combat.stopCombat(player.name))
            Untravel.System.run(() => player.sendMessage(`§a■§aYa no estas en combate`))
    })

}, 20)

