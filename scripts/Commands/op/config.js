import { LogWarn } from "../../Modules/Log/Log";
import Utility from "../../Modules/Utilities/Utility";
import Database from "../../Extensions/Database";
import Untravel from "../../Untravel";

console.log("Comando config cargada")

Untravel.cmd.add({
    name: "config",
    description: "?",
    usage: "?",
    aliases: ["cfg"],
    admin: true,
    category: "Op",

}, (data, player, args) => {
    const password = Database.get("word")
    if (!args[0]) return player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {
        //let args2 = args.slice(args[0].length).split(/ +/);
        if (!args[1]) return player.sendMessage("§a■§cIngresa el parametro correcto")

        if ((args[1] == "resetFund")) {
            return Untravel.Fund.resetData(), LogWarn("[Advertencia] Se borraron los Fondos")
        }
        if (args[1] == "resetMoney") {
            return Untravel.Money.resetData(), LogWarn("[Advertencia] Se borro el Dinero")
        }
        if (args[1] == "msg") {
            return player.sendMessage(`${args}`)
        }
        if (args[1] == "owndb") {
            let message = ""
            Untravel.Owners.forEach((key, value) => {
                if (key) {
                    let password = value
                    let owner = key
                    message += `\n§1  |§f ${owner}§1  |§b ${password}`;
                }
            })
            if (message != "") {
                return player.sendMessage(`§1------------------------------\n§a■§3Owners List : ${message}`)
            }
            else {
                return player.sendMessage("§a■§cNo hay Claves.")
            }
        }
        else {
            player.sendMessage("§a■§cIngresa el parametro correcto")
        }
    } else {
        player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})