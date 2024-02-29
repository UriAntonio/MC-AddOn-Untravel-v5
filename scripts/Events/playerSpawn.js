import { onJoinData } from "../Modules/Data/onJoinData.js";
import { welcome } from "../util/newMemberMessage.js";
import Config from "../Commands/Configuration.js";
import Untravel from "../Untravel.js";
import { Log, LogWarn } from "../Modules/Log/Log.js";
import { Player } from "@minecraft/server";
import untravel from "../Extensions/untravel.js";
import opSystem from "../Modules/Security/AuthOp.js";

const BanDB = Untravel.BanDB
const TimeDB = Untravel.TimeDB
const { symbols: { Chalenger } } = untravel
const statsDB = Untravel.PlayerStats
const Owners = Untravel.Owners


const playerStats = {
  name: "",
  money: 0,
  //level: 0,//
  //exp: 0,//
  //kills: 0,//
  //deaths: 0,//
  //rank: [],//
  //title: [],//
  vidaM: 20,
  manaM: 0,
  regen: 2,
  //plusRegen: 0,//
  //vault: {//
  //  vaultID: 0,//
  //  key: 0//
  //}
}

function rankFilter(player) {
  let tags = player.getTags()
  let rank
  for (const tag of tags) {
    if (tag.startsWith("Rank:")) {
      staffTag = tag
    }
    if (tag.startsWith("Rank:")) {
      rank = tag
      Config.ranks.staff.list
      addtag = tag + "--"
    }
  }


  if (player.isAdmin()) {
    player.addTag(`Rank:§l§b${Chalenger}`)
  }
}



/**
 * 
 * @param {Player} player 
 */
function onJoinSpawn(player) {
  try {
    player.runCommandAsync(`testfor @s`);

    // Bloquea el Untravel si esta en true
    if (Config.lockServer) {
      let reason = "Bajo Mantenimiento! Perdón por las molestias.";
      try {
        // Kick a los jugadores del Untravel
        player.runCommandAsync(`kick ${JSON.stringify(player.name)} ${reason}`);
      } catch (error) {
        // Despawn players from Untravel
        player.triggerEvent("minecraft:kick");
      }
    }

    let stats = statsDB.get(player.id)
    if(stats == undefined) stats = playerStats
    statsDB.set(player.id, stats)

    statsDB.get(player.id)
    stats.name = player.name
    stats.money = player.getMoney()
    stats.vidaM = player.getmaxHealth()
    stats.manaM = player.getmaxMana()
    stats.regen = player.getRegen()
    statsDB.set(player.id, stats)
    







    if (player.isAdmin()) {
      if (!player.hasTag(`Rank:§l§b${Chalenger}`)) {
        player.addTag(`Rank:§l§b${Chalenger}`)
      }
      if (!player.hasTag("Notify")) {
        player.addTag("Notify")
      }


    }
    if (!player.isAdmin() && player.hasTag(`Rank:§l§b${Chalenger}`)) {
      player.removeTag(`Rank:§l§b${Chalenger}`)
    }
    let gamemode
    //player.runCommandAsync(`gamemode s @s[tag=!${Config.AdminTag}]`)
    //Verificamos el modo de juego del jugador
    gamemode = player.gamemode
    if (!player.isAdmin()) {
      gamemode = "survival"
    }
    //Owners.reset
    if (Owners.lenght == 0 ) {
      opSystem(player)
    }

    welcome(player, gamemode);
    Log(`[ 000 ]§b${player.name}§7 se unió al servidor ${Date()} | gm:  ${gamemode}`)
    // Ejecutanos cada comando en la lista
    for (let i = 0; i < onJoinData.length; i++) {
      try {
        player.runCommandAsync(`${onJoinData[i]}`);
      } catch (error) { }
    }
  } catch (error) { LogWarn(`§cError al unirse: ${player} | ${error}`) }
}

Untravel.world.afterEvents.playerSpawn.subscribe((loaded) => {
  // Toma el nombre del jugador que se esta uniendo
  let player = loaded.player;
  // Ejecuta la funcion con el tick event
  if (loaded.initialSpawn) {
    //Verificacion de Baneo
    if (BanDB.has(player.name)) {

      let banData = BanDB.get(player.name)
      if (!banData.duration) return player.kick(`\n§l§cFUISTE BANNEADO!\n§bRazon:§r ${banData.reason}\n§eBanned Por:§r ${banData.by}\n§6Si piensas que hubo un error\ncomunicate a §bsupport@untravelmx.com  §r`)
      if (Date.now() > banData.duration) {
        BanDB.delete(player.name)
      } else {
        return player.kick(`\n§l§cFUISTE BANNEADO!\n§bRazon:§r ${banData.reason} \n§r\n§eBanned Por:§r${banData.by} \n§cDuration : §e${Utility.formatTextFutureDate(banData.duration)}`)
      }
    }
    Untravel.PlayerOnline[player.name] = Date.now()
    if (TimeDB.has(player.name) == false) {
      TimeDB.set(player.name, 0)
    }
    if (TimeDB.get(player.name) == null | undefined) {
      TimeDB.set(player.name, 0)
      LogWarn(`[ Time ] Ocurrio un error y se le reasigno el tiempo a ${player.name}`)
    }
    Untravel.System.run(() => {
      onJoinSpawn(player);
    });

  } else {
    player.setHealth(player.getmaxHealth()) 
    if ((Untravel.Setting.get("backSystem") ?? true) == false) return
    //player.sendMessage(`§eYou died. use §a!back§e to teleport to your death location.`)
  }

});

