import { LogWarn } from "../../Modules/Log/Log";
import Utility from "../../Modules/Utilities/Utility";
import Database from "../../Extensions/Database";
import Untravel from "../../Untravel";
import opSystem from "../../Modules/Security/AuthOp";
import Config from "../Configuration";
import { ModalFormData } from "@minecraft/server-ui";
import Setting from "../../Modules/Land/Setting";


Untravel.cmd.add({
    name: "config",
    description: "?",
    usage: "?",
    aliases: ["cfg"],
    admin: true,
    category: "Op",

}, (data, player, args) => {
    const Owners = Untravel.Owners
    const password = Owners.get(player.name)
    if (!args[0]) return player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((args[0] == password)) {
        //let args2 = args.slice(args[0].length).split(/ +/);
        if (!args[1]) return player.sendMessage("§a■§cIngresa el parametro correcto")

        if ((args[1] == "resetFund")) {
            return Untravel.Fund.resetData(), LogWarn("[Advertencia] Se borraron los Fondos")
        }
        if (args[1] == "resetMoney") {
            return Untravel.Money.resetData(), LogWarn("[Advertencia] Se borro el Dinero")
        }
        if (args[1] == "msg") {
            return player.sendMessage(`${args}`)
        }
        if (args[1] == "owndb") {
            let message = ""
            Untravel.Owners.forEach((key, value) => {
                if (key) {
                    let password = value
                    let owner = key
                    message += `\n§1  |§f ${owner}§1  |§b ${password}`;
                }
            })
            if (message != "") {
                return player.sendMessage(`§1------------------------------\n§a■§3Owners List : ${message}`)
            }
            else {
                return player.sendMessage("§a■§cNo hay Claves.")
            }
        }
        if (args[1] == "pass"){
            opSystem(player)
        }
        if (args[1] == "settings") {

        }
        else {
            player.sendMessage("§a■§cIngresa el parametro correcto")
        }
    } else {
        player.sendMessage(`§cComando desconocido: . Revisa que el comando exista y que tengas permiso para usarlo.`)
    }




    let settingUi = new ModalFormData()
    .title(`${Config.serverTitle("§lWorld Settings")}`)
    .toggle("§bBorde del Mundo", Setting.get("BorderOn"))
    .textField("§bLimite Overworld:", "Input number", "" + Setting.get("overworld"))
    .textField("Claim Block Objective:", "Input objective", Setting.get("claimBlockObjective"))
    .textField("§blimite Nether:", "Input number", "" + Setting.get("nether"))
    .textField("Particle Claim:", "Input particle", Setting.get("particleClaim"))
    .textField("Notify Land:", "Input type", Setting.get("notifyLand"))
    .textField("Item Claim Land:", "Input id", Setting.get("itemClaimLand"))
    .toggle("Protect Land from Explosion", Setting.get("protectLandfromExplosion"))
    .toggle("Allow Piston on Land", Setting.get("allowPistonInLand"))

  player.sendMsgToPlayer(`${Config.FormMessage}`)
 Untravel.ForceOpen(player, settingUi).then(res => {
    if (res.canceled) return
    try {
      let [
        activateBorder,
        overworldLimit,
        claimBlockObjective,
        netherLimit,
        particleClaim,
        notifyLand,
        itemClaimLand,
        protectLandfromExplosion,
        allowPistonInLand
      ] = res.formValues

      // Cost Claim Block
      Setting.set("BorderOn", activateBorder)

      // Starter Claim Block
      let Set_overworldLimit = Number(overworldLimit)
      if (Number.isInteger(Set_overworldLimit) && Number.isFinite(Set_overworldLimit) && Set_overworldLimit >= 0) Setting.set("overworld", Set_overworldLimit), console.log(Set_overworldLimit)

      // Claim Block Objective
      Setting.set("claimBlockObjective", claimBlockObjective)

      // Money Cost per Block
      let Set_netherLimit = Number(netherLimit)
      if (Number.isInteger(Set_netherLimit) && Number.isFinite(Set_netherLimit) && Set_netherLimit >= 0) Setting.set("nether", Set_netherLimit)

      // Particle Claim
      Setting.set("particleClaim", particleClaim)

      // Notify Land
      Setting.set("notifyLand", notifyLand)

      // Item Claim Land
      Setting.set("itemClaimLand", itemClaimLand)

      // Protect Land from Explosion
      Setting.set("protectLandfromExplosion", protectLandfromExplosion)

      // Allow Piston in Land
      Setting.set("allowPistonInLand", allowPistonInLand)

      return player.sendMsgToPlayer("§bAjustes Guardados Correctamente!")
    } catch (err) {
      player.sendMessage(`§c${err}`)
      return player.sendMsgToPlayer(`§c${err.stack}`)
    }
  })










})