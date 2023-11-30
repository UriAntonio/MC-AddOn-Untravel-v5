import { LogWarn } from "../../Modules/Log/Log";
import Utility from "../../Modules/Utilities/Utility";
import Database from "../../Extensions/Database";
import Server from "../../server";

const prefix = Server.getPrefix()
const password = Database.get("word")
Server.Commands.register({
    name: "config",
    description: "?",
    usage: "?",
    aliases: ["cfg"],
    admin: true,
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {
        //let args2 = args.slice(args[0].length).split(/ +/);
        if (!args[1]) return player.sendMessage("§a■§cIngresa el parametro correcto")

        if ((args[1] == "resetFund")) {
            return Server.Fund.resetData(), LogWarn("[Advertencia] Se borraron los Fondos")
        }
        if (args[1] == "resetMoney") {
            return Server.Money.resetData(), LogWarn("[Advertencia] Se borro el Dinero")
        }
        if (args[1] == "msg") {
            return player.sendMessage(`${args}`)
        }
    } else {
        player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})