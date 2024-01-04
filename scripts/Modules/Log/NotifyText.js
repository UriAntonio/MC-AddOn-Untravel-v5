import Untravel from "../../Untravel"

const CooldownNotify = {}
export const CooldownMark = []

export const NotifyText = (player, message) => {
  const Cooldown = CooldownNotify[player.name] ?? (Date.now() - 500)
  if (Date.now() - Cooldown >= 500) Untravel.sendMsgToPlayer(player, message)
  CooldownNotify[player.name] = Date.now()
}