import { EquipmentSlot, Player } from "@minecraft/server";
import Server from "../../server";
import ChestFormData, { SizeType } from "../../Modules/Utilities/ChestForms";
import { ForceOpen } from "../../Modules/Server/Forms"
import Utility from "../../Modules/Utilities/Utility"

/**
 * Get Index by Value in Object
 * @param {object} obj 
 * @param {any} value 
 * @returns {string}
 */
const findIndexByValue = (obj, value) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  return undefined
}

Server.Commands.register({
    name: "inventorysee",
    description: "Checa el Inventario del Jugador",
    usage: "invsee <player_name>",
    aliases: ["invsee"],
    admin: true,
    category: "Admin"
}, async (data, player, args) => {
    if (!args[0]) return player.sendMessage(`§a■§cIngresa un nombre de Jugador`)
    let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
    if (!extractData) return player.sendMessage(`§a■§cIngresa un nombre de Jugador valido`)
    let targetPlayer = await Server.getPlayer(extractData.name)
    if (targetPlayer != undefined) {
        player.sendMessage(`§1------------------------------\n§a■§3Cierra el Chat para ver el Panel`)
        CheckInventory(player, targetPlayer)
    } else {
        player.sendMessage(`§a■§cNo hay Objetivos que coincidan con el selector`)
    }
})


/**
 * @param {Player} player 
 * @param {Player} targetPlayer 
 */
const CheckInventory = async (player, targetPlayer) => {
    player.sendMessage(`funcion llamada`)
    let playerInventory = targetPlayer.getInvetory()
    player.sendMessage(`${playerInventory}`)
    let playerEquipment = targetPlayer.getEquipmentInventory()
    player.sendMessage(`${playerEquipment}`)
    const InventoryForm = new ChestFormData(SizeType.Shop)
        .title(`Inventario de ${targetPlayer.name}`)

    let playerItems = {}
    for (let slot = 0; slot < playerInventory.size; slot++) {
        let item = playerInventory.getItem(slot)
        if (!item) continue
        playerItems[slot] = item
        let itemDesc = []
        let ench = item.getComponent("enchantments")
        let enchantments = Array.from(ench.enchantments)
        let enchantedItem = false
        if (enchantments.length > 0) {
            enchantedItem = true
            enchantments.forEach(e => itemDesc.push(Utility.enchantToText(e)))
        }
        itemDesc.push("")
        item.getLore().forEach(l => itemDesc.push("§o§5" + l))
        itemDesc.push(`§cClick para eliminar del Inventario`)
        InventoryForm.button(slot, Utility.getItemname(item), itemDesc, item.type.id, item.amount, enchantedItem)
    }

    const buttonSlot = {
        "head": 36,
        "chest": 37,
        "legs": 38,
        "feet": 39,
        "offhand": 44
    }
    let playerItemEquipment = {}
    
    for (const slot in EquipmentSlot) {
    player.sendMessage(`slot :${slot}`)
        
        let item = playerEquipment.getEquipment(slot)
        if (!item) continue
        if (!buttonSlot[slot]) continue
        playerItemEquipment[slot] = item
        let itemDesc = []
        let ench = item.getComponent("enchantments")
        let enchantments = Array.from(ench.enchantments)
        let enchantedItem = false
        if (enchantments.length > 0) {
            enchantedItem = true
            enchantments.forEach(e => itemDesc.push(Utility.enchantToText(e)))
        }
        itemDesc.push("")
        item.getLore().forEach(l => itemDesc.push("§o§5" + l))
        itemDesc.push(`§cClick to remove from inventory`)
        InventoryForm.button(buttonSlot[slot], Utility.getItemname(item), itemDesc, item.type.id, item.amount, enchantedItem)
    }
    
    let res = await ForceOpen(player, InventoryForm)
    if (!res.canceled) {
        if (res.selection < 36) {
            let selectedItem = playerItems[res.selection]
            if (!selectedItem) return
            let item = playerInventory.getItem(res.selection)
            if (!item || item.type != selectedItem.type) return player.sendMessage("§a■§cNo se encontro Item!")
            playerInventory.setItem(res.selection)
            player.getInvetory().addItem(item)
            player.sendMessage("§1------------------------------\n§a■§aSe elimino el item correctamente")
        } else {
            let slot = findIndexByValue(buttonSlot, res.selection)
            let selectedItem = playerItemEquipment[slot]
            if (!selectedItem) return
            let item = playerEquipment.getEquipment(slot)
            if (!item || item.type != selectedItem.type) return player.sendMessage("§a■§cNo se encontro Item!")

            playerEquipment.setEquipment(slot)
            player.getInvetory().addItem(item)
            player.sendMessage("§1------------------------------\n§a■§aSe elimino el item correctamente")
        }
    }
}

export default CheckInventory