import * as mc from "@minecraft/server"
import Untravel from "../Untravel"
import { getScore, setScore } from "./Server/Scoreboard";
import Config from "../conf/Configuration";
import Combat from "./Server/Combat";
import Database from "../Extensions/Database";
import { Log } from "./Log/Log";
import untravel from "../Extensions/untravel";

const { standar } = untravel

const PlayerClass = Object.assign(mc.Player.prototype, {
  /**
 * Checa si el Player es admin
 * @ {data}
 * @returns {boolean}
 * @type {Player}
 */
  isAdmin() {//Pendiente  a mejorar
    return Database.get(Config.AdminTag) === Database.get(Config.AdminTag, this)

  },
  isOwner() {
    let Id = this.id
    Log(`${Id}`)
    if (Config.Owners.includes(Id)) return true
    return false
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
  },

  /**
     * Check if player has Tag
     * @param {string} tag 
     * @returns {string | undefined}
     */
  checkTag(tag) {
    return this.getTags().find(t => t.toLowerCase() == tag)
  },

  /**
     * Check if Player have permission
     * @param {string} permission 
     */
  checkPermission(permission) {
    return this.isAdmin() || this.checkTag(`admin:${permission}`) != undefined
  },

  getClaimBlock() {
    return Untravel.getClaimBlock(this)
  },

  setClaimBlock(amount) {
    return Untravel.setClaimBlock(this, amount)
  },


  /**
   * return the actual health of a player
   * @returns {number}
   */
  getHealth() {
    return this.getDynamicProperty("vida") ?? standar.actualHealth
  },

  /**
   * set the value for health of a player
   * @param {number} value 
   */
  setHealth(value) {
    this.setDynamicProperty("vida", Math.min((value), this.getmaxHealth()))
  },

  /**
   * converted the output from float to Integrer of health
   * @returns {number}
   */
  getformatedHealth() {
    return (this.getHealth()).toFixed()
  },

  /**
   * Get the max health of a player
   * @returns {number}
   */
  getmaxHealth() {
    let stat = Untravel.PlayerStats.get(this.name)
    if (stat == undefined) return standar.maxHealth
    if (!stat["vidaM"] == undefined) return stat["vidaM"]
    return standar.maxHealth
  },

  /**
   * Set the max health of a player
   * @param {number} value 
   */
  setmaxHealth(value) {
    let stat = Untravel.PlayerStats.get(this.name)
    stat["vidaM"] = value
    Untravel.PlayerStats.set(this.name, stat)
  },

  /**
   * get tha actual mana of a player
   * @returns {number}
   */
  getMana() {
    return this.getDynamicProperty("mana") ?? standar.actualMana
  },

  /**
   * Set the actual mana of a player
   * @param {number} value 
   */
  setMana(value) {
    this.setDynamicProperty("mana", Math.min(value, this.maxMana))
  },

  /**
 * converted the output from float to Integrer of mana
 * @returns {number}
 */
  getformatedMana() {
    return (this.getMana()).toFixed()
  },

  /**
   * get the max mana of a player
   * @return {number}
   */
  getmaxMana() {
    let stat = Untravel.PlayerStats.get(this.name)
    if (stat == undefined) return standar.maxMana
    if (!stat["manaM"] == undefined) return stat["manaM"]
    return standar.maxMana
  },

  /**
   * Set the max mana of a player
   * @param {number} value 
   */
  setmaxMana(value) {
    let stat = Untravel.PlayerStats.get(this.name)
    stat["manaM"] = value
    Untravel.PlayerStats.set(this.name, stat)
  },

  /**
   * Get the stat of Regeneration per porcentage of a player
   * @return {number}
   */
  getRegen() {
    let stat = Untravel.PlayerStats.get(this.name)
    if (stat == undefined) return standar.actualRegen
    if (!stat["regen"] == undefined) return stat["regen"]
    return standar.actualRegen
  },

  /**
   * Set the percentage of regeneration of a player
   * @param {number} value 
   */
  setRegen(value) {
    let stat = Untravel.PlayerStats.get(this.name)
    stat["regen"] = value
    Untravel.PlayerStats.set(this.name, stat)
  }



})

export default PlayerClass