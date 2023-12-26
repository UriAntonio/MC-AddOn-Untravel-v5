import Untravel from "../../Untravel"

const WarpDB = Untravel.WarpDB

Untravel.cmd.add({
  name: "listwarp",
  description: "Provee una lista de los warps disponibles",
  aliases: ["lw"],
  usage: "listwarp",
  category: "Warp"
}, async (data, player, args) => {
  let message = ""
  WarpDB.forEach((key, value) => {
    let placeName = key
    message += `\n§1  -§b ${placeName}`;
  })
  if (message != "") {
    player.sendMessage("§1------------------------------\n§a■§9Warps list :" + message)
  }
  else {
    player.sendMessage("§1------------------------------\n§a■§cNo hay Warps puestos.")
  }
})