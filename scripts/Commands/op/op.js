import { LogWarn } from "../../Modules/Log/Log.js";
import Database from "../../Extensions/Database.js";
import Untravel from "../../Untravel.js";
import Config from "../Configuration.js";
import untravel from "../../Extensions/untravel.js";

const { symbols: { Chalenger } } = untravel


Untravel.cmd.add({
    name: "op",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {
    //we need the world key
    const password = Database.get("world")
    const Admins = Untravel.Admins
    if (!args[0]) return player.sendMessage(`1§cCommando desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
    if (player.isOwner()) {

        if (args[0] !== password) return player.sendMessage(`§cContraseña incorrecta, Revisa que la contraseña exista y que tengas permiso para usarlo.`)
        if (player.isAdmin()) return player.sendMessage("§a■No se ejecuto porque ya eres Admin")
        let key = Config.AdminKey
        Admins.set(player.name, key)
        LogWarn(`[Advertencia] ${player.name} ahora es Admin`)
        player.sendMsgToPlayer(`§bAhora eres Admin`)
        if (!player.hasTag(`Rank:§l§b${Chalenger}`)) {
            player.addTag(`Rank:§l§b${Chalenger}`)
          }
        Database.set("Notify", true, player)
        if (!player.hasTag(Config.gmc)) {
            player.addTag(Config.gmc)
        }

    } else {
        player.sendMessage(`2§cComando desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})