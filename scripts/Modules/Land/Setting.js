import { DB } from "../DataBase/UntravelDB";
import Config from "./../../conf/Configuration";
import EventEmitter from "./EventEmitter";

const SettingDatabase = new DB("Land_settingDB")

const Setting = {}
Setting.SettingData = new Map()
SettingDatabase.forEach((settingName, value) => Setting.SettingData.set(settingName, value))

/**
   * Get Setting
   * @param {string} settingName 
   * @returns {any}
   */
Setting.get = (settingName) => {
  return Setting.SettingData.get(settingName)
}

/**
 * Set Setting
 * @param {string} settingName 
 * @param {any} value 
 */
Setting.set = (settingName, value) => {
  SettingDatabase.set(settingName, value)
  Setting.SettingData.set(settingName, value)
}

EventEmitter.on("mce-settingChanged", (data) => {
  Setting.SettingData.set(data.settingName, data.value)
})

Object.keys(Config).forEach(settingName => {
  if (Setting.get(settingName) == undefined) Setting.set(settingName, Config[settingName])
})

export default Setting