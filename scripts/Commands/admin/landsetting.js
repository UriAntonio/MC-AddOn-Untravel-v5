import { system, world, Player, Vector } from "@minecraft/server";
import * as ui from "@minecraft/server-ui"
import Setting from "../../Modules/Land/Setting";
import Untravel from "../../Untravel";
import Config from "../../conf/Configuration";

const Position = {}

Untravel.cmd.add({
  name: "landsetting",
  description: "Setting Land system",
  category: "Admin",
  admin: true,
  usage: "landsetting"
}, async (data, player, args) => {
  let settingUi = new ui.ModalFormData()
    .title(`${Config.serverTitle("Land Setting")}`)
    .toggle("Cost Claim Block", Setting.get("costClaimBlock"))
    .textField("Starter Claim Block:", "Input number", "" + Setting.get("starterClaimBlock"))
    .textField("Claim Block Objective:", "Input objective", Setting.get("claimBlockObjective"))
    .textField("Money Cost per Block:", "Input number", "" + Setting.get("moneyCostperBlock"))
    .textField("Particle Claim:", "Input particle", Setting.get("particleClaim"))
    .textField("Notify Land:", "Input type", Setting.get("notifyLand"))
    .textField("Item Claim Land:", "Input id", Setting.get("itemClaimLand"))
    .toggle("Protect Land from Explosion", Setting.get("protectLandfromExplosion"))
    .toggle("Allow Piston on Land", Setting.get("allowPistonInLand"))

  player.sendMessage(`${Config.FormMessage}`)
  await Untravel.ForceOpen(player, settingUi).then(res => {
    if (res.canceled) return
    try {
      let [
        costClaimBlock,
        starterClaimBlock,
        claimBlockObjective,
        moneyCostperBlock,
        particleClaim,
        notifyLand,
        itemClaimLand,
        protectLandfromExplosion,
        allowPistonInLand
      ] = res.formValues

      // Cost Claim Block
      Setting.set("costClaimBlock", costClaimBlock)

      // Starter Claim Block
      let Set_starterClaimBlock = Number(starterClaimBlock)
      if (Number.isInteger(Set_starterClaimBlock) && Number.isFinite(Set_starterClaimBlock) && Set_starterClaimBlock >= 0) Setting.set("starterClaimBlock", Set_starterClaimBlock)

      // Claim Block Objective
      Setting.set("claimBlockObjective", claimBlockObjective)

      // Money Cost per Block
      let Set_moneyCostperBlock = Number(moneyCostperBlock)
      if (Number.isInteger(Set_moneyCostperBlock) && Number.isFinite(Set_moneyCostperBlock) && Set_moneyCostperBlock >= 0) Setting.set("moneyCostperBlock", Set_moneyCostperBlock)

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

      return player.sendMessage("§aSuccessfully saved settings!")
    } catch (err) {
      player.sendMessage(`§c${err}`)
      return player.sendMessage(`§c${err.stack}`)
    }
  })
})