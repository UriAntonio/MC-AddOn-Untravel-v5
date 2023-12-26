import { EquipmentSlot, Player } from "@minecraft/server";
import Untravel from "../../Untravel";
import ChestFormData from "../../Modules/Utilities/ChestForms";
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

Untravel.cmd.add({
  name: "invsee",
  description: "Checa el Inventario del Jugador",
  usage: "invsee <player_name>",
  aliases: ["invsee"],
  admin: true,
  category: "Admin"
}, async (data, player, args) => {
  if (!args[0]) return player.sendMessage("§a■§cIngresa un nombre de Jugador.")
  let extractData = await Utility.ExtractNameFromString(args.join(" "), 0)
  if (!extractData) return player.sendMessage("§a■§cIngresa un nombre de Jugador valido.")
  let targetPlayer = await Untravel.getPlayer(extractData.name)
  if (targetPlayer != undefined) {
    player.sendMessage("§1------------------------------\n§a■§3Cierra el Chat para ver el Panel")
    await CheckInventory(player, targetPlayer)
  } else {
    player.sendMessage("§a■§cNo hay Objetivos que coincidan con el selector")
  }
})


/**
 * @param {Player} player 
 * @param {Player} targetPlayer 
 */
const CheckInventory = async (player, targetPlayer) => {
  let playerInventory = targetPlayer.getInvetory()
  let playerEquipment = targetPlayer.getEquipmentInventory()
  const InventoryForm = new ChestFormData("shop")
    .title(`${targetPlayer.name}'s Inventory`)

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
    InventoryForm.button(slot, Utility.getItemname(item), itemDesc, item.typeId, item.amount, enchantedItem)
  }

  const buttonSlot = {
    "Head": 36,
    "Chest": 37,
    "Legs": 38,
    "Feet": 39,
    "Offhand": 44
  }
  let playerItemEquipment = {}
  for (const slot in EquipmentSlot) {
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
    InventoryForm.button(buttonSlot[slot], Utility.getItemname(item), itemDesc, item.typeId, item.amount, enchantedItem)
  }

  let res = await ForceOpen(player, InventoryForm)
  if (!res.canceled) {
    if (res.selection < 36) {
      let selectedItem = playerItems[res.selection]
      if (!selectedItem) return
      let item = playerInventory.getItem(res.selection)
      if (!item || item.typeId != selectedItem.typeId) return player.sendMessage("§a■§cNo se encontro Item!")

      playerInventory.setItem(res.selection)
      player.getInvetory().addItem(item)
      player.sendMessage("§1------------------------------\n§a■§aSe elimino el item correctamente")
    } else {
      let slot = findIndexByValue(buttonSlot, res.selection)
      let selectedItem = playerItemEquipment[slot]
      if (!selectedItem) return
      let item = playerEquipment.getEquipment(slot)
      if (!item || item.typeId != selectedItem.typeId) return player.sendMessage("§cItem not found!")

      playerEquipment.setEquipment(slot)
      player.getInvetory().addItem(item)
      player.sendMessage("§1------------------------------\n§a■§aSe elimino el item correctamente")
    }
  }
}

export default CheckInventory