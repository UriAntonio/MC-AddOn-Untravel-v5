
import Database from "../../Extensions/Database";
import { Log } from "../../Modules/Log/Log";
import Untravel from "../../Untravel";


Untravel.cmd.add({
    name: "notify",
    description: "Habilita o desabilita las notificaciones en ti mismo. true - false",
    usage: "notify <boolean>",
    admin: true,
    category: "Admin",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`§a■§cIngresa un parametro`)
    if ((args[0] == "true")) {
        if (player.hasTag("Notify")) return player.sendMessage("§a■No se ejecuto porque ya esta activado")
        Database.set("Notify", true, player)
        Log(`${player.name} activo sus Notificaciones`)
        player.sendMessage(`§1------------------------------\n§a■§3Tus notificaciones fueron §bActivadas!`)
        return
    }
    if ((args[0] == "false")) {
        if (!player.hasTag("Notify")) return player.sendMessage("§a■No se ejecuto porque ya esta desactivado")
        Database.set("Notify", false, player)
        Log(`${player.name} desactivo sus Notificaciones`)
        player.sendMessage(`§1------------------------------\n§a■§3Tus notificaciones fueron §bDesactivadas!`)
        return
    }
     else {
        player.sendMessage(`§a■§cIngresa el parametro correcto`)
    }




})