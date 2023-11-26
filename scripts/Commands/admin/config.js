import { Log } from "../../Modules/Log/Log";
import Utility from "../../Modules/Utilities/Utility";
import Config from "../../conf/Configuration";
import Server from "../../server";

const prefix = Server.getPrefix()

Server.Commands.register({
    name: "config",
    description: "?",
    usage: "?",
    aliases: ["cfg"],
    admin: true,
    category: "Admin",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == Config.ConfigPassword)) {
        //let args2 = args.slice(args[0].length).split(/ +/);
        if (!args[1]) return player.sendMessage("§a■§cIngresa el parametro correcto")

        if ((args[1] == "resetFund")) {
            return Server.Fund.resetData()
        }
        if (args[1] == "resetMoney") {
            return Server.Money.resetData()
        }
        if (args[1] == "msg") {
            return player.sendMessage(`${args}`)
        }
    } else {
        player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})