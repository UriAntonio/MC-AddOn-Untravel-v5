import { LogWarn } from "../../Modules/Log/Log";
import Database from "../../Extensions/Database";
import Server from "../../server";
import Config from "../../conf/Configuration";

const prefix = Server.getPrefix()
const password = Config.TemporalKey
Server.Commands.register({
    name: "op",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§cComando desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {
        if (player.isAdmin()) return player.sendMessage("§a■No se ejecuto porque ya eres Admin")
        let key = Database.get(Config.AdminTag)
        Database.set(Config.AdminTag, key, player)
        LogWarn(`[Advertencia] ${player.name} ahora es Admin`)
        if (!player.hasTag("Rank:§l§b★★★★★★★")) {
            player.addTag("Rank:§l§b★★★★★★★")
        }
        Database.set("Notify", true, player)
        if (!player.hasTag(Config.gmc)) {
            player.addTag(Config.gmc)
        }

        //let args2 = args.slice(args[0].length).split(/ +/);
        // if (!args[1]) return player.sendMessage("§a■§cIngresa el parametro correcto")

        // if ((args[1] == "resetFund")) {
        //     return Server.Fund.resetData(), LogWarn("[Advertencia] Se borraron los Fondos")
        // }
        // if (args[1] == "resetMoney") {
        //     return Server.Money.resetData(), LogWarn("[Advertencia] Se borro el Dinero")
        // }
        // if (args[1] == "msg") {
        //     return player.sendMessage(`${args}`)
        // }
    } else {
        player.sendMessage(`§cComando desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})