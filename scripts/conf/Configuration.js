const Config = {}

// NOT RECOMMENDED TO CHANGE, MAY CAUSE A LAG
//Config.maxShop = 11 // 11 x 96 = 1056, That means limit for Shop is 1056
//Config.maxAuction = 11 // 11 x 96 = 1056, That means limit for Shop is 1056

// Cooldown Configuration
//Config.backCooldown = 30  // Back Cooldown
//Config.tpaCooldown = 5  // TPA & TPAHere Cooldown
//Config.homeCooldown = 5  // Home Cooldown
//Config.warpCooldown = 5  // Warp Cooldown
//Config.commandCooldown = 5  // Command Cooldown

// Teleport Countdown Configuration
//Config.backCountdown = 5  // Countdown before Teleport
//Config.tpaCountdown = 5  // Countdown before Teleport
//Config.homeCountdown = 5  // Countdown before Teleport
//Config.warpCountdown = 5  // Countdown before Teleport

// Home Configuration
//Config.homeLimit = 10 // Limit Home for Player

// Combat Configuration
//Config.combatSystem = false // If true, player not able to teleport while in pvp and if they leave or die, they will lost their money

// Money Configuration
//Config.maxMoney = 1000 // Max Money
//Config.starterMoney = 100 // Starter Money
//Config.currencyPrefix = "" // Currency / Money Prefix
//Config.earnMoneyfromMobs = true // Money drop from killing Mobs
Config.moneyFromMobs = { // Money drop from killing Mobs
  "minecraft:pig": [1, 5],
  "minecraft:cow": [1, 5],
  "minecraft:sheep": [1, 5],
  "minecraft:chicken": [1, 5],
  "minecraft:cod": [1, 5],
  "minecraft:salmon": [1, 5],
  "minecraft:pufferfish": [1, 5],
  "minecraft:tropicalfish": [1, 5],

  "minecraft:zombie": [20, 50],
  "minecraft:husk": [20, 50],
  "minecraft:skeleton": [20, 50],
  "minecraft:stray": [20, 50],
  "minecraft:blaze": [20, 50],
  "minecraft:zombie_villager": [20, 50],
  "minecraft:zombie_villager_v2": [20, 50],
  "minecraft:pillager": [20, 50],
  "minecraft:vex": [20, 50],
  "minecraft:evocation_illager": [20, 50],
  "minecraft:slime": [20, 50],
  "minecraft:drowned": [20, 50],
  "minecraft:guardian": [20, 50],
  "minecraft:iron_golem": [20, 50],
  "minecraft:spider": [20, 50],
  "minecraft:magma_cube": [20, 50],
  "minecraft:cave_spider": [20, 50],
  "minecraft:endermite": [20, 50],
  "minecraft:piglin": [20, 50],
  "minecraft:piglin_brute": [20, 50],
  "minecraft:zoglin": [20, 50],
  "minecraft:shulker": [20, 50],
  "minecraft:enderman": [20, 50],
  "minecraft:phantom": [20, 50],
  "minecraft:creeper": [25, 55],
  "minecraft:wither_skeleton": [20, 50],
  "minecraft:ghast": [20, 50],
  "minecraft:witch": [30, 50],
  "minecraft:zombie_pigman": [20, 50],

  "minecraft:warden": [70, 100],
  "minecraft:ravager": [70, 100],
  "minecraft:wither": [70, 100],
  "minecraft:ender_dragon": [70, 100]
}

// Command Configuration
Config.Prefix = "-"  // Command Prefix
Config.lockServer = false
Config.debug = true
Config.serverName = `§r§b■§d§lUntravel§eMx§b■§r`
Config.Commands = {  // Commands Configuration (Don't change, unless you understand the code)
  general: {
    //help: true,
    //back: true,
    //playerlist: true,
    //tps: true,
    //message: true
  },
  money: {
    //money: true,
    //pay: true,
    //topmoney: true,
    //shop: true,
    //sell: true,
    //auctionhouse: true
  },
  home: {
    //home: true,
    //sethome: true,
    //delhome: true,
    //listhome: true
  },
  warp: {
    //warp: true,
    //listwarp: true
  },
  tpa: {
    //tpa: true,
    //tpahere: true,
    //tpasetting: true
  },
  admin: {
    //setmoney: true,
    //setwarp: true,
    //delwarp: true,
    //broadcast: true,
    //kick: true,
    //ban: true,
    //unban: true,
    //setting: true,
    //shopsetting: true,
    //sellsetting: true,
    //resetdata: true,
   // adminpanel: true,
    //mute: true,
    //unmute: true,
    //invsee: true,
    //log: true
  }
}

export default Config