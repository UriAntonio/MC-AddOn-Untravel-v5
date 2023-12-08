import { Log } from "../../Modules/Log/Log"
import Untravel from "../../Untravel"


Untravel.Commands.register({
    name: "coliseo",
    description: "Enciende o paga el Coliseo",
    usage: "coliseo <true | false>",
    admin: true,
    category: "Admin",

}, (data, player, args) => {

    if ((args == "help")) {
        return //gmcHelp(player, prefix);
    }
    if (args == "true") {
        Database.set("coliseoManager", true)
        Log(`[ Coliseo ] ${player.name} encendio el Coliso`)
        return
    }
    if (args == "false") {
        Database.set("coliseoManager", false)
        Log(`[ Coliseo ] ${player.name} apago el Coliso`)
        return
    }
    player.sendMessage(`§a■§cIngresa un parametro correcto`)




})