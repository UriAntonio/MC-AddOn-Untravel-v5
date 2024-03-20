/**
 *las porpiedades almacenadas en /tu-server/config/(uuid-default)/varibles.json
 *Un objeto glogalmente disponible que retorna una lista de variables configuradas en tu server dedicado
 *mas info: https://learn.microsoft.com/en-us/minecraft/creator/documents/scriptingservers
*/
import { variables } from "@minecraft/server-admin";
import untravel from "../Extensions/untravel";

const emoji = untravel.symbols
const Config = {}

// NOT RECOMMENDED TO CHANGE, MAY CAUSE A LAG
//Config.maxShop = 11 // 11 x 96 = 1056, That means limit for Shop is 1056
//Config.maxAuction = 11 // 11 x 96 = 1056, That means limit for Shop is 1056

// Cooldown Configuration
//Config.backCooldown = 30  // Back Cooldown
//Config.tpaCooldown = 7  // TPA & TPAHere Cooldown
Config.homeCooldown = 300  // Home Cooldown
//Config.warpCooldown = 7  // Warp Cooldown
Config.rtpCooldown = 0  // RTP Cooldown
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
Config.xpPrefix = emoji.exp
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
//contraseña que sera usada para dar OP
Config.AdminKey = variables.get("adminPassword") ?? "2642key"
//tag que sera usada solo por el admin
Config.AdminTag = variables.get("adminTag") ?? "Admin"
Config.Owners = ["2535410465040894", "2535428592704562"] ?? ["KlarixMx"]
Config.gmc = variables.get("creative") ?? "creativo"
Config.lockServer = false
Config.debug = true
Config.ConfigPassword = variables.get("Cpassword") ?? "874236pass"
Config.FundsName = "§g■§6Fondos Generales"
Config.serverName = `§r§b■§d§lUntravel§eMx§b■§r`
Config.Commands = {  // Commands Configuration (Don't change, unless you understand the code)
  general: {
    help: true,
    //back: true,
    playerlist: true,
    tps: true,
    //message: true,
    rtp: true,
    time: true,
    
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
    home: true
  },
  warp: {
    warp: true
  },
  domain: {
    domain: true
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
    item: true,
    funds: true,
    notify: true,
    coliseo: true,
    allhomes: true,
    allmoney: true,
    lastjoin: true,
    landsetting: true,
    copyitem: true,
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
Config.serverStyler = "§1-------------------------\n§a»"
Config.FormMessage = `${Config.serverStyler}§3Cierra el Chat para ver el Panel`
Config.serverTitle = (title) => {
let formated = `§9${title}`
return formated
}
// Dangerous Setting (Only change if you know)

/**
 * Number of custom item that you add, Only change this if there is error with texture in UI
 * Set to undefined to use automatically calculate
 * Set to number if there is error
 */
Config.NumberOf_1_16_100_Items = undefined

/**
 * Claim Block = How much player can claim
 * Example: 64 Claim block, thats means player can only claim 64 block
 * true = On
 * false = Off
 * Set it off = Player will not cost / use Claim Block
 */
Config.costClaimBlock = true

/**
 * Starter Player Claim Block
 * Max: 2147483647
 */
Config.starterClaimBlock = 512

/**
 * Claim Block Objective
 */
Config.claimBlockObjective = "ClaimBlock"

/**
 * Money cost per block
 * Example: If you set it to 2. Then it will cost 2 Coin per block
 * Set it 0 to make it free
 */
Config.moneyCostperBlock = 2

/**
 * Particle when player set position
 */
Config.particleClaim = "minecraft:endrod"

/**
 * Notify when enter or exit land
 * None = No notify
 * ActionBar = Notify on Action Bar
 * Chat = Notify on Chat
 * Title = Notify on Title
 */
Config.notifyLand = "ActionBar"

/**
 * Item that used to set start or end position
 */
Config.itemClaimLand = "minecraft:golden_shovel"

/**
 * If its set to true, any explosion can't destroy land
 */
Config.protectLandfromExplosion = true

/**
 * If its set to true, other player can't use piston to break into other player land
 */
Config.allowPistonInLand = false

//Settings
Config.moneySystem = true
Config.homeSystem = true
Config.tpaSystem = true
Config.backSystem = true
Config.shopSystem = true
Config.sellSystem = true
Config.auctionSystem = true
Config.messageSystem = true
Config.combatSystem = true
Config.combatSystem = true

Config.BorderOn = true
Config.Border = {
  overworld : 4000,
  nether: 500,
  end: 2000
}
export default Config