import Fund from "../../Modules/Finance/Funds"
import Money from "../../Modules/Finance/Money"
import Config from "../../conf/Configuration"
import Untravel from "../../Untravel"


const HomeDB = Untravel.HomeDB

Untravel.cmd.add({
  name: "delhome",
  aliases: ["dhome", "dh"],
  description: "Borra o Remueve un hogar",
  usage: "delhome <home_name>",
  category: "Home"
}, async (data, player, args) => {
  let homeArr = []
  let cost = Config.homeCost / 2
  HomeDB.forEach((key) => {
    if (key.startsWith(player.name)) {
      let hname = key.substring(`${player.name}-`.length)
      homeArr.push(`${hname}`);
    }
  })
  for (let i = 1; i < homeArr.length; i++) {
    cost = cost + cost;

  }
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  if (!args[0]) return player.sendMessage("§a■§cIngresa un nombre de hogar.")
  let name = args.slice(0).join(" ")
  let playerHome = HomeDB.keys().find(h => h == `${player.name}-${name}`)
  if (playerHome != undefined) {
    if (!player.isAdmin()) {
      Money.setMoney(player.name, balance + cost)
      Fund.setMoney(balanceFund - cost)
      await HomeDB.delete(playerHome)
      player.sendMessage(`§a■§3Eliminado exitosamente el hogar con el nombre §f${name}§3! con un rembolso de: §f${cost}`)
      return
    }
    await HomeDB.delete(playerHome)
    player.sendMessage(`§1------------------------------\n§a■§3Eliminado exitosamente el hogar con el nombre §f${name}§3!`)
  } else {
    player.sendMessage("§a■§cHogar no valido.")
  }
})