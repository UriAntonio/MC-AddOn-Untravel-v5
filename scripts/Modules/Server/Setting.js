import { Database } from "../DataBase/Database";

const SettingDatabase = new Database("settingDB")

const SettingType = {
  TRUEFALSE: 0, //cero es igual a false
  CUSTOMSTR: 1,
  CUSTOMNUM: 2
}

let SettingList = {
  "moneySystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use money system/command"],
  "homeSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use home system/command"],
  "tpaSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use tpa system/command"],
  "backSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use back command"],
  "shopSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use shop system/command"],
  "sellSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use sell system/command"],
  "auctionSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use auction system/command"],
  "messageSystem": [SettingType.TRUEFALSE, "If set to false, anyone can't use message/reply command"],
  "combatSystem": [SettingType.TRUEFALSE, "If set to true, player not able to teleport while in pvp/combat. If they leave it will count as a death"],
  "starterMoney": [SettingType.CUSTOMNUM, "Set Player Starter Money"],
  "maxMoney": [SettingType.CUSTOMNUM, "Set Max Money"],
  "homeLimit": [SettingType.CUSTOMNUM, "Set Limit Home for Players"],
  "backCooldown": [SettingType.CUSTOMNUM, "Cooldown for Back command, Set 0 for no cooldown"],
  "tpaCooldown": [SettingType.CUSTOMNUM, "Cooldown for TPA command, Set 0 for no cooldown"],
  "homeCooldown": [SettingType.CUSTOMNUM, "Cooldown for Home command, Set 0 for no cooldown"],
  "warpCooldown": [SettingType.CUSTOMNUM, "Cooldown for Warp command, Set 0 for no cooldown"],
  "commandPrefix": [SettingType.CUSTOMSTR, "Prefix for Command"],
  "currencyPrefix": [SettingType.CUSTOMSTR, "Currency Prefix"],
  "earnMoneyfromMobs": [SettingType.TRUEFALSE, "If set to false, anyone can't earn money from killing mobs"],
  "backCountdown": [SettingType.CUSTOMNUM, "If setted, player will wait for countdown to teleport"],
  "tpaCountdown": [SettingType.CUSTOMNUM, "If setted, player will wait for countdown to teleport"],
  "homeCountdown": [SettingType.CUSTOMNUM, "If setted, player will wait for countdown to teleport"],
  "warpCountdown": [SettingType.CUSTOMNUM, "If setted, player will wait for countdown to teleport"],
  "commandCooldown": [SettingType.CUSTOMNUM, "Cooldown for command, Set 0 for no cooldown"]
}

export default class Setting {
  constructor() {
    this.SettingData = new Map()
    this.Type = SettingType
    this.List = SettingList
    SettingDatabase.forEach((settingName, value) => this.SettingData.set(settingName, value))
  }
  
  /**
   * Get Setting
   * @param {string} settingName 
   * @returns {any}
   */
  get(settingName) {
    return this.SettingData.get(settingName)
  }

  /**
   * Set Setting
   * @param {string} settingName 
   * @param {any} value 
   */
  set(settingName, value) {
    SettingDatabase.set(settingName, value)
    this.SettingData.set(settingName, value)
  }

  async resetAll() {
    await this.SettingData.clear()
    await SettingDatabase.clear()
  }
}