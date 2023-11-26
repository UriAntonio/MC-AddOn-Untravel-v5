import { LogWarn } from "../../Modules/Log/Log";
import Database from "../../Extensions/Database";
import Server from "../../server";
import Config from "../../conf/Configuration";

const prefix = Server.getPrefix()
const password = Config.TemporalKey
Server.Commands.register({
    name: "deop",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {

        Database.delete(Config.AdminTag, player)
        LogWarn(`[Advertencia] ${player.name} ya NO es Admin`)
        if (player.hasTag("Rank:§l§b★★★★★★★")) {
            player.removeTag("Rank:§l§b★★★★★★★")
          }
          if (player.hasTag("Notify")) {
            player.removeTag("Notify")
          }
          if (player.hasTag(Config.gmc)) {
            player.removeTag(Config.gmc)
        }
    } else {
        player.sendMessage(`§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})