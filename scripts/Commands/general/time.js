import { ActionFormData } from "@minecraft/server-ui";
import Untravel from "../../Untravel";
import { ForceOpen } from "../../Modules/Server/Forms";
import Config from "../../Commands/Configuration.js";
import { Log } from "../../Modules/Log/Log";


const TimeDB = Untravel.TimeDB

Untravel.cmd.add({
    name: "time",
    description: "Ve el tiempo de coneccion total a partir del 29/12/23)",
    category: "General",
    usage: "time",
}, async (data, player, args) => {
    let title ="§9tiempo online de jugadores" 
    let message = ""
    TimeDB.forEach((key, value) => {
      let plr = key
      const DateNow = new Date()
      let DateLogin = Untravel.PlayerOnline[plr]
      if (DateLogin == undefined) DateLogin = 0
      const TimePlayed = (DateNow - DateLogin)
      const SecondPlayed = Math.ceil((TimePlayed + value) / 1000);
      message += `\n§1 | §3${plr} §1| §bOnline Total§1 -`
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
    player.sendMessage(`${Config.FormMessage}`)
    let res = await ForceOpen(player, form)
    if (!res.canceled){
        player.playSound("random.levelup")
    }

    //player.sendMessage(message)
})