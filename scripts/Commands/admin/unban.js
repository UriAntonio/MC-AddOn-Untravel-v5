import Untravel from "../../Untravel.js"
import { ModalFormData } from "@minecraft/server-ui"
import Config from "../Configuration.js"
import { ForceOpen } from "../../Modules/Server/Forms.js"



Untravel.cmd.add({
  name: "unban",
  description: "Desbanea a un Jugador",
  usage: "unban",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  const BanDB = Untravel.BanDB
  const f = new ModalFormData
  const playersArr = BanDB.lenght > 0 ? BanDB.keys() : ["Sin Datos"] 
  f.title("§a■§9§lUNBAN§r§a■")
  f.dropdown("§bSelecciona el Jugador a Desbanear.", playersArr)
  player.sendMessage(Config.FormMessage)
  let response = await ForceOpen(player, f)
  if (response.canceled) {
    return player.sendMessage(`${Config.serverStyler}§cNo se desbaneo a Nadie.`)
  } else {
    let targetPlayer = playersArr[response.formValues[0]]
    if (targetPlayer == "Sin Datos") return player.sendMessage(`${Config.serverStyler}§cNo hay nadie Baneado Aún`)
    await BanDB.delete(targetPlayer)
    player.sendMessage(`${Config.serverStyler}§3Se Desbaneo a §r${targetPlayer} §3exitosamente.`)
  }
})