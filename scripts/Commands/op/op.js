import { LogWarn } from "../../Modules/Log/Log";
import Database from "../../Extensions/Database";
import Untravel from "../../Untravel";
import Config from "../../conf/Configuration";
import untravel from "../../Extensions/untravel";

const { symbols: { Chalenger } } = untravel
const password = Database.get(Config.AdminTag)
Untravel.cmd.add({
    name: "op",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`1§cCommando desconocido: op, Revisa que el comando exista y que tengas permiso para usarlo.`)
    if (player.isOwner()) {
        

        if (args[0] !== password) return player.sendMessage(`§cContraseña incorrecta, Revisa que la contraseña exista y que tengas permiso para usarlo.`)
        if (player.isAdmin()) return player.sendMessage("§a■No se ejecuto porque ya eres Admin")
        let key = Database.get(Config.AdminTag)
        Database.set(Config.AdminTag, key, player)
        LogWarn(`[Advertencia] ${player.name} ahora es Admin`)
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