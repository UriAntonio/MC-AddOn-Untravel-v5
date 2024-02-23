import { LogWarn } from "../../Modules/Log/Log";
import Database from "../../Extensions/Database";
import Untravel from "../../Untravel";
import Config from "../../conf/Configuration";
import untravel from "../../Extensions/untravel";

const { symbols: { Chalenger } } = untravel
const password = Config.TemporalKey
Untravel.cmd.add({
    name: "deop",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {
        if (!player.isOwner()) return player.sendMessage(`§cComanndo desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
        Database.delete(Config.AdminTag, player)
        LogWarn(`[Advertencia] ${player.name} ya NO es Admin`)
        if (player.hasTag(`Rank:§l§b${Chalenger}`)) {
            player.removeTag(`Rank:§l§b${Chalenger}`)
          }
          Database.set("Notify", false, player)
          if (player.hasTag(Config.gmc)) {
            player.removeTag(Config.gmc)
        }
    } else {
        player.sendMessage(`§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})