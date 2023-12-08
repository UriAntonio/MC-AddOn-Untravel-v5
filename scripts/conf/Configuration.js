/**
 *las porpiedades almacenadas en /tu-server/config/(uuid-default)/varibles.json
 *Un objeto glogalmente disponible que retorna una lista de variables configuradas en tu server dedicado
 *mas info: https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptingservers
*/
import { variables } from "@minecraft/server-admin";

const Config = {}

// NOT RECOMMENDED TO CHANGE, MAY CAUSE A LAG
//Config.maxShop = 11 // 11 x 96 = 1056, That means limit for Shop is 1056
//Config.maxAuction = 11 // 11 x 96 = 1056, That means limit for Shop is 1056

// Cooldown Configuration
//Config.backCooldown = 30  // Back Cooldown
//Config.tpaCooldown = 7  // TPA & TPAHere Cooldown
Config.homeCooldown = 300  // Home Cooldown
//Config.warpCooldown = 7  // Warp Cooldown
// Config.rtpCooldown = 120  // RTP Cooldown
Config.commandCooldown = 7  // Command Cooldown
Config.coliseoCooldown = 600  // Command Cooldown

// Teleport Countdown Configuration
//Config.backCountdown = 7  // Countdown before Teleport
//Config.tpaCountdown = 7  // Countdown before Teleport
Config.homeCountdown = 7  // Countdown before Teleport
//Config.warpCountdown = 7  // Countdown before Teleport
//Config.rtpCountdown = 5  // Countdown before Teleport

// Home Configuration
Config.homeLimit = 10 // Limit Home for Player
Config.homeCost = 3000
Config.homeTpCost = 50
Config.homeTpCostNether = 1000
Config.homeTpCostEnd = 5000

// Warp Configuration
Config.warpCost = 200
Config.warpColiseo = 800


// Combat Configuration
Config.combatSystem = true // If true, player not able to teleport while in pvp and if they leave or die, they will lost their money

// Money Configuration
Config.maxMoney = 1000000000 // Max Money
Config.starterMoney = 0.0 // Starter Money
Config.currencyPrefix = "" // Currency / Money Prefix
Config.earnMoneyfromMobs = true // Money drop from killing Mobs
Config.moneyFromMobs = { // Money drop from killing Mobs
  "minecraft:pig": [1, 3],
  "minecraft:cow": [1, 3],
  "minecraft:sheep": [1, 3],
  "minecraft:chicken": [1, 3],
  "minecraft:cod": [1, 3],
  "minecraft:salmon": [1, 3],
  "minecraft:pufferfish": [1, 3],
  "minecraft:tropicalfish": [1, 3],

  "minecraft:zombie": [10, 25],
  "minecraft:husk": [20, 30],
  "minecraft:skeleton": [20, 30],
  "minecraft:stray": [20, 30],
  "minecraft:blaze": [20, 30],
  "minecraft:zombie_villager": [20, 30],
  "minecraft:zombie_villager_v2": [20, 30],
  "minecraft:pillager": [20, 30],
  "minecraft:vex": [20, 30],
  "minecraft:evocation_illager": [20, 30],
  "minecraft:slime": [5, 10],
  "minecraft:drowned": [20, 30],
  "minecraft:guardian": [20, 30],
  "minecraft:spider": [20, 30],
  "minecraft:magma_cube": [5, 10],
  "minecraft:cave_spider": [20, 30],
  "minecraft:endermite": [20, 30],
  "minecraft:piglin": [20, 30],
  "minecraft:piglin_brute": [20, 30],
  "minecraft:zoglin": [10, 20],
  "minecraft:shulker": [20, 30],
  "minecraft:enderman": [20, 30],
  "minecraft:phantom": [30, 60],
  "minecraft:creeper": [25, 55],
  "minecraft:wither_skeleton": [20, 30],
  "minecraft:ghast": [20, 30],
  "minecraft:witch": [30, 30],
  "minecraft:zombie_pigman": [20, 30],
  "minecraft:hoglin": [5, 20],
//bosses
"minecraft:elder_guardian": [70, 200],
  "minecraft:warden": [70, 200],
  "minecraft:ravager": [50, 70],
  "minecraft:wither": [70, 200],
  "minecraft:ender_dragon": [70, 200]
}

// Command Configuration
Config.Prefix = "-"  // Command Prefix
Config.AdminKey = variables.get("adminPassword")//contraseña que sera usada para dar OP
Config.AdminTag = variables.get("adminTag")  //tag que sera usada solo por el admin
Config.TemporalKey = variables.get("temporalKey")
Config.gmc = variables.get("creative")
Config.lockServer = false
Config.debug = true
Config.ConfigPassword = variables.get("Cpassword")
Config.FundsName = "§g■§6Fondos Generales"
Config.serverName = `§r§b■§d§lUntravel§eMx§b■§r`
Config.Commands = {  // Commands Configuration (Don't change, unless you understand the code)
  general: {
    help: true,
    //back: true,
    playerlist: true,
    tps: true,
    //message: true,
    //rtp: true
  },
  money: {
    cartera: true,
    pay: true,
    topmoney: true,
    //shop: true,
    //sell: true,
    //auctionhouse: true
  },
  home: {
    home: true,
    sethome: true,
    delhome: true,
    listhome: true
  },
  warp: {
    warp: true,
    listwarp: true
  },
  tpa: {
    //tpa: true,
    //tpahere: true,
    //tpasetting: true
  },
  admin: {
    setmoney: true,
    setwarp: true,
    delwarp: true,
    //broadcast: true,
    //kick: true,
    ban: true,
    unban: true,
    //setting: true,
    //shopsetting: true,
    //sellsetting: true,
    //resetdata: true,
   // adminpanel: true,
    //mute: true,
    //unmute: true,
    invsee: true,
    log: true,
    //tempban: true,
    gm: true,
    funds: true,
    notify: true,
    coliseo: true,
    allhomes: true,
    allmoney: true,
  },
  op: {
    op: true,
    deop: true,
    config: true,
  }
}

Config.ranks = {
  staff: {
    list: ["Adminer",`Moderator`, "Helper"],
    Adminer: "Rank:§l§b★★★★★★",
    Moderator: "Rank:§l§b★★★★★",
    Helper: "Rank:§l§b★★★",
  },
  members: {},
  selecto: {}

}

// Dangerous Setting (Only change if you know)

/**
 * Number of custom item that you add, Only change this if there is error with texture in UI
 * Set to undefined to use automatically calculate
 * Set to number if there is error
 */
Config.NumberOf_1_16_100_Items = undefined

export default Config