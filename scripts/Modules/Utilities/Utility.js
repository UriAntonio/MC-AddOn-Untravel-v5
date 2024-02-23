import * as mc from "@minecraft/server"
import Config from "../../conf/Configuration"
import Untravel from "../../Untravel"
const Utility = {}

const ExtractResult = {
  name: "",
  string: ""
}
/**
 * Extract Name from String
 * @param {string} string 
 * @param {number} index 
 * @returns {ExtractResult}
 */
Utility.ExtractNameFromString = async (string, index) => {
  return new Promise((resolve, reject) => {
    let splitText = string.split(" ")
    let result = {
      name: "",
      string: ""
    }
    if (splitText[index].startsWith(`"`)) {
      result.name += splitText[index]
      let trimed = 1
      if (!splitText[index].endsWith(`"`)) {
        for (let i = index + 1; i <= splitText.length - 1; i++) {
          result.name += " " + splitText[i]
          trimed += 1
          if (splitText[i].endsWith(`"`)) break;
        }
      }
      if (!result.name.endsWith(`"`)) { resolve() }
      result.name = result.name.replaceAll(`"`, "")
      splitText.splice(index, trimed)
      result.string = splitText.join(" ")
    } else {
      result.name = splitText[index]
      splitText.splice(index, 1)
      result.string = splitText.join(" ")
    }
    resolve(result)
  })
}

/**
 * Get Item name from ItemStack
 * @param {mc.ItemStack} item 
 * @returns {string}
 */
Utility.getItemname = (item) => {
  return item.nameTag ?? item.typeId.split(":")[1].split('_').map(v => v[0].toUpperCase() + v.slice(1).toLowerCase()).join(" ")
}

/**
 * Capitalized String
 * @param {string} string 
 * @returns {string}
 */
Utility.capitalized = (string) => {
  return string.split('_').map(v => v[0].toUpperCase() + v.slice(1).toLowerCase()).join(" ")
}

/**
 * Format Money
 * @param {number} money 
 * @param {boolean} withPrefix 
 * @returns {string}
 */
Utility.formatMoney = (money, withPrefix = true) => {
  const currencyPrefix = Untravel.Setting.get("xpPrefix") ?? Config.xpPrefix
  return `${withPrefix ? currencyPrefix : ""}${money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

// Author: GlitchyTurtle32 <https://github.com/GlitchyTurtle>
// Project: https://github.com/JaylyDev/ScriptAPI
/**
 * @param {number} num
 */
Utility.toRomanNumeral = (num) => {
  var lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

Utility.compareString = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Generate Random String
 * @param {number} length
 * @returns {string}
 */
Utility.generateRandomString = (length) => {
  if (!length) length = Math.floor(Math.random() * (10 - 8 + 1)) + 8;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id
}

/**
 * Enchat to Text
 * @param {mc.Enchantment} enchant 
 * @returns {string}
 */
Utility.enchantToText = (enchant) => {
  let level = Utility.toRomanNumeral(enchant.level)
  let type = enchant.type.id

  let text = ""
  switch (type) {
    case "binding":
      text += "§cCurse of Binding"
      break

    case "vanishing":
      text += "§cCurse of Vanishing"
      break

    default:
      text += `§7${Utility.capitalized(type)}`
      break
  }
  text += ` ${level}`
  return text
}

/**
 * Random number
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
Utility.random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
Utility.UUID = (function () {
  const self = { generate: this };
  const lut = [];
  for (var i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? "0" : "") + i.toString(16);
  }
  self.generate = function () {
      const d0 = (Math.random() * 0x100000000) >>> 0;
      const d1 = (Math.random() * 0x100000000) >>> 0;
      const d2 = (Math.random() * 0x100000000) >>> 0;
      const d3 = (Math.random() * 0x100000000) >>> 0;
      return (lut[d0 & 0xff] +
          lut[(d0 >> 8) & 0xff] +
          lut[(d0 >> 16) & 0xff] +
          lut[(d0 >> 24) & 0xff] +
          "-" +
          lut[d1 & 0xff] +
          lut[(d1 >> 8) & 0xff] +
          "-" +
          lut[((d1 >> 16) & 0x0f) | 0x40] +
          lut[(d1 >> 24) & 0xff] +
          "-" +
          lut[(d2 & 0x3f) | 0x80] +
          lut[(d2 >> 8) & 0xff] +
          "-" +
          lut[(d2 >> 16) & 0xff] +
          lut[(d2 >> 24) & 0xff] +
          lut[d3 & 0xff] +
          lut[(d3 >> 8) & 0xff] +
          lut[(d3 >> 16) & 0xff] +
          lut[(d3 >> 24) & 0xff]);
  };
  return self;
})()

export default Utility