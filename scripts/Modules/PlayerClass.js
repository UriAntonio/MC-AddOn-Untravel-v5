import * as mc from "@minecraft/server"
import Untravel from "../Untravel"
import { getScore, setScore } from "./Server/Scoreboard";
import Config from "../conf/Configuration";
import Combat from "./Server/Combat";
import Database from "../Extensions/Database";


const PlayerClass = Object.assign(mc.Player.prototype, {
  /**
 * Checa si el Player es admin
 * @ {data}
 * @returns {boolean}
 */
  isAdmin() {
    return Database.get(Config.AdminTag) === Database.get(Config.AdminTag, this)
    
  },
  /**
   * Checa si el Player apaga TPA
   * @returns {boolean}
   */
  noTPA() {
    let tag = this.getTags().find(t => t.startsWith("tpasetting"))
    if (tag == undefined) {
      return false
    }
    let set = tag.substring("tpasetting:".length)
    if (set == "on") return false
    if (set == "off") return true
  },
  /**
   * Obten el Player Inventory
   * @returns {mc.Container}
   */
  getInvetory() {
    return Untravel.getInventory(this)
  },
  /**
   * Obten la cantidad de Items en el Inventory
   * @param {string} typeId 
   * @returns {number}
   */
  getItemAmount(typeId) {
    let amount = 0
    let inventory = this.getInvetory()
    for (let i = 0; i < inventory.size; i++) {
      let item = inventory.getItem(i)
      if (!item) continue
      if (item.typeId == typeId) amount += item.amount
    }

    return amount
  },
  /**
  * @param {string} message
  * @returns {Promise<mc.CommandResult>}
  */
  async kick(message) {
    return await Untravel.runCommand(`kick "${this.name}" ${message ?? ""}`)
  },
  /**
     * Checa si el Player esta silenciado
     * @returns {boolean}
     */
  isMuted() {
    return this.hasTag("isMuted")
  },
  /**
   * Silencia al jugador
   * @returns {boolean}
   */
  mute() {
    if (!this.isMuted()) return this.addTag("muted")
  },
  /**
     * Des-silenciar al jugador
     * @returns {boolean}
     */
  unmute() {
    if (this.isMuted()) return this.removeTag("muted")
  },

  /**
   * Asigna el Score desde el Objective
   * @param {string} objectiveId 
   * @param {number} score 
   * @returns 
   */
  setScore(objectiveId, score) {
    return setScore(this, objectiveId, score)
  },

  /**
   * Obten el Score desde el Objective
   * @param {string} objectiveId 
   * @returns 
   */
  getScore(objectiveId) {
    return getScore(this, objectiveId)
  },
  /**
   * Obten el Dinero del Jugador
   * @returns {number}
   */
  getMoney() {
    return Untravel.Money.getMoney(this.name)
  },

  /**
   * Asigna el Dinero del Jugador
   * @param {number} amount cantidad
   */
  async setMoney(amount) {
    await Untravel.Money.setMoney(this.name, amount)
  },
  /**
     * Obten el Equipment Inventory del Jugador
     * @returns {mc.EntityEquipmentInventoryComponent}
     */
  getEquipmentInventory() {
    return this.getComponent("minecraft:equippable")
  },

  /**
   * Checa si el Jugador esta en Combate
   * @returns {boolean}
   */
  isCombat() {
    return Combat.isCombat(this.name)
  }
})

export default PlayerClass