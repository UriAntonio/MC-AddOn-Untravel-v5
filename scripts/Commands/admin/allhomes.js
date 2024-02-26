import Untravel from "../../Untravel"



Untravel.cmd.add({
    name: "allhomes",
    aliases: ["ah"],
    description: "ve lista completa de homes guardados",
    usage: "allhomes",
    admin: true,
    category: "Admin"
}, async (data, player, args) => {
  const HomeDB = Untravel.HomeDB
    let message = ""
    HomeDB.forEach((key, value) => {
        if (key) {
          let home = value
          let hname = key
          message += `\n§1  |§f ${hname}§1  |§b ${Math.round(home.x)}, ${Math.round(home.y)}, ${Math.round(home.z)} §1| §9${home.dimension}`;
        }
      })
      if (message != "") {
        player.sendMessage(`§1------------------------------\n§a■§3Homes List : ${message}`)
      }
      else {
        player.sendMessage("§a■§cHo hay Hogares.")
      }
})