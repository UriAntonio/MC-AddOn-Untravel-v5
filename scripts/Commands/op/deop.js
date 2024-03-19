import { LogWarn } from "../../Modules/Log/Log.js";
import Database from "../../Extensions/Database.js";
import Untravel from "../../Untravel.js";
import Config from "../Configuration.js";
import untravel from "../../Extensions/untravel.js";

const { symbols: { Chalenger } } = untravel
const Owners = Untravel.Owners
const Admins = Untravel.Admins
Untravel.cmd.add({
    name: "deop",
    description: "?",
    usage: "?",
    category: "Op",

}, (data, player, args) => {

    if (!args[0]) return player.sendMessage(`1§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if (player.isOwner()) {
        const password = Owners.get(player.name)
        if ((args[0] !== password)) return player.sendMessage(`§cContraseña Incorrecta, Revisa tu contraseña exista y que tengas permiso para usarlo.`)
        Admins.delete(player.name)
        LogWarn(`[Advertencia] ${player.name} ya NO es Admin`)
        if (player.hasTag(`Rank:§l§b${Chalenger}`)) {
            player.removeTag(`Rank:§l§b${Chalenger}`)
        }
        Database.set("Notify", false, player)
        if (player.hasTag(Config.gmc)) {
            player.removeTag(Config.gmc)
        }
    } else {
        player.sendMessage(`2§cComando desconocido: op. Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




})