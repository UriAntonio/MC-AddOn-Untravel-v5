import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import { ForceOpen } from "../../Modules/Server/Forms";
import { LogWarn } from "../../Modules/Log/Log";

const TimeDB = Untravel.TimeDB

Untravel.Commands.register({
    name: "time",
    description: "Ve el tiempo de coneccion general a partir del 14/12/23)",
    category: "General",
    usage: "time",
}, async (data, player, args) => {
    let title ="§a■§1[§9TIEMPO DE JUGADORES§1]§a■"
    let message = ""
    LogWarn(`${JSON.stringify(TimeDB.entries())}`)
    TimeDB.forEach((key, value) => {
      let plr = key
      const DateNow = new Date()
      const DateLogin = value//TimeDB.get(plr)
      const SecondPlayed = Math.ceil((DateNow - DateLogin) / 1000);
      message += `\n§1 | §3${plr} §1| §bOnline desde§1 -`
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
    player.sendMessage("§1------------------------------\n§a■§3Cierra el Chat para ver el Panel")
    let res = await ForceOpen(player, form)
    if (!res.canceled){
        player.playSound("random.levelup")
    }

    //player.sendMessage(message)
})