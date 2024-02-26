import Untravel from "../../Untravel";


Untravel.cmd.add({
    name: "copyitem",
    description: "Create a copy of an Item",
    category: "Admin",
    usage: "copyitem"
},(data,player,args) => {
    let item = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot)
    if (!item) return player.sendMsgToPlayer("§cNo hay Items para clonar")
    let newItem = item.clone()
    player.getComponent("minecraft:inventory").container.addItem(newItem)
    player.sendMsgToPlayer("§bItem clonado correctamente")
})