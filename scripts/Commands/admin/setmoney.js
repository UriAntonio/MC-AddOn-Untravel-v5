import { ModalFormData } from "@minecraft/server-ui";
import { Log } from "../../Modules/Log/Log"
import Utility from "../../Modules/Utilities/Utility"
import Untravel from "../../Untravel"
import Config from "../../conf/Configuration";
import { ForceOpen } from "../../Modules/Server/Forms";

Untravel.cmd.add({
  name: "setmoney",
  aliases: ["sm"],
  description: "Establese el dinero de un jugador",
  usage: "setmoney <player_name> <cantidad>",
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  const players = Untravel.Minecraft.world.getAllPlayers();
  const playersArr = players.map(pl => pl.name)
  const f = new ModalFormData
  f.title("§a■§9§lSET MONEY§r§a■")
  f.dropdown("§bSelect a player to transfer to.", playersArr)
  f.textField(`§3Cantidad:\n`, '')
  player.sendMessage(Config.FormMessage)
  let response = await ForceOpen(player, f)
  if (response.formValues != undefined) {
    let amount = Number(response.formValues[1])
    if (!Number.isInteger(amount)) {
      return player.sendMessage(`${Config.serverStyler}§a■§cIngresa la cantidad en un Número.`)
    } else {
      let targetSelected = playersArr[response.formValues[0]]
      let targetPlayer = await Untravel.getPlayer(targetSelected)
      if (targetPlayer != undefined) {
        await targetPlayer.setMoney(amount)
        player.sendMessage(`${Config.serverStyler}§3Se puso a §b${targetPlayer.name}§3 la cantidad de §f${Utility.formatMoney(amount)} §3exitosamente.`)
        Log(`[ MONEY ]${player.name} puso a §b${targetPlayer.name}§3 la cantidad de §f${amount}`)
      } else {
        return player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
      }
    }
  }
})