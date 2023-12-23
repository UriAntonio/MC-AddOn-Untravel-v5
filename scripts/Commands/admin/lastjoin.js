import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import { ForceOpen } from "../../Modules/Server/Forms";
import Config from "../../conf/Configuration";


const LastDB = Untravel.LastDB

Untravel.Commands.register({
    name: "last",
    description: "Ve la ultima conexion de lun jugador ,a partir del 19/12/23)",
    category: "Admin",
    usage: "last <Nombre_Jugador>",
    admin: true
}, async (data, player, args) => {
    let title ="§a■§1[§9ULTIMA CONEXION§1]§a■"
    let message = ""
    LastDB.forEach((key, value) => {
      let plr = key
      const DateNow = Date.now()
      const SecondPlayed =Math.ceil((DateNow - value) / 1000);
      message += `\n§1 | §3${plr} §1| §bno entra desde hace§1 -`
      if (SecondPlayed >= 86400) {
        let day = Math.floor(SecondPlayed / 86400)
        message += ` §f${day} §bdias,`
      }
      if (SecondPlayed >= 3600) {
        let hour = Math.floor(SecondPlayed / 3600)
        message += `\n§1 - §f${hour % 24} §bhoras,`
      }
      if (SecondPlayed >= 60) {
        let minute = Math.floor(SecondPlayed / 60)
        message += ` §f${minute % 60} §bminutos,`
      }
      let second = SecondPlayed
      message += ` §f${second % 60} §bsegundos`
    })
    const form = new ActionFormData().title(`${title}`).body(`${message}`).button("§9Ok")
    player.sendMessage(Config.FormMessage)
    let res = await ForceOpen(player, form)
    if (!res.canceled){
        player.playSound("random.levelup")
    }

    //player.sendMessage(message)
})