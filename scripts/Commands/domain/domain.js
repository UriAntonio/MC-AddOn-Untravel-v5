import { system, world, Player, Vector, EntityHealthComponent } from "@minecraft/server";
import Land from "../../Modules/Land/Land";
import isMoving from "../../Modules/PlayerMove";
import * as ui from "@minecraft/server-ui"
import Setting from "../../Modules/Land/Setting";
import Untravel from "../../Untravel";
import ParticleLand from "../../Modules/Land/Particle";
import { Log } from "../../Modules/Log/Log";
import { CooldownMark } from "../../Modules/Log/NotifyText";
import Action from "../../Modules/Log/ActionLog"
import Config from "../../Commands/Configuration.js";

const Position = {}

Untravel.cmd.add({
  name: "domain",
  description: "Reclama tu propio Dominio protegido",
  category: "Domain",
  usage: "domain help",
  aliases: ["dominio"]
}, async (data, player, args) => {
  switch (args[0]?.toLowerCase()) {
    case "startpos":
      var block = player.dimension.getBlock(player.location).below()
      return StartPos(player, block.location)

    case "endpos":
      var block = player.dimension.getBlock(player.location).below()
      return EndPos(player, block.location)

    case "claim":
      return ClaimFunction(player, args)

    case "list":
      return ListFunction(player)

    case "unclaim":
      return UnClaimFunction(player)

    case "invite":
      return InviteFunction(player, args.slice(1))

    case "kick":
      return KickFunction(player, args.slice(1))

    case "transferoipropiedad":
      return TransferOwnershipFunction(player, args.slice(1))

    case "info":
      return InfoFunction(player)

    case "players":
      if (player.isAdmin()) {
        player.sendMessage(Config.FormMessage)
        return PlayerLandFunction(player, args.slice(1))
      }

    // case "setting": -- BUGGING --
    //   return SettingsFunction(player)

    default:
      const prefix = await Untravel.GetSetting("Prefix")
      let subcommandList = {
        "startpos": ["Asigna la posicion inicial del Dominio"],
        "endpos": ["Asigna la posicion final del Dominio"],
        "claim": ["Afirma tu Dominio"],
        "list": ["Prove una lista de tu Dominio"],
        "unclaim": ["Desasegura el Dominio"],
        "invite": ["Invita a jugadores a tu Dominio", ["player_name"]],
        "kick": ["Expulsa a un jugador de tu Dominio", ["player_name"]],
        "transferOwnership": ["Transfiere la Propiedad del Dominio", ["player_name"]]
      }

      if (player.isAdmin()) {
        subcommandList["players"] = ["Prove ana lista del los Dominios de los Jugadore", ["player_name?"]]
      }

      let message = `§3Lista de comandos del Dominio:`
      Object.keys(subcommandList).forEach(name => {
        const options = subcommandList[name]
        const cmd = `${prefix}domain ${name}`
        message += `\n§9 - §b${cmd} §9| ${cmd}${options[1] == undefined ? "" : ` ${options[1].map(v => v = `<${v}>`).join(" ")}`} (${options[0]})`
      })

      Untravel.sendMsgToPlayer(player,message)
  }
})

/**
 * @param {Player} player 
 * @param {Vector} location
 * @returns 
 */
const StartPos = (player, location) => {
  if (!Position[player.name]) Position[player.name] = {}
  Position[player.name].start = {
    x: Math.floor(location.x),
    y: Math.floor(location.y),
    z: Math.floor(location.z),
    lastChange: Date.now()
  }
  return Untravel.sendMsgToPlayer(player,`§3Puesto inicial-pos en coordenadas §bx: ${Math.floor(location.x)} z: ${Math.floor(location.z)}`);
}

/**
 * @param {Player} player 
 * @param {Vector} location
 * @returns 
 */
const EndPos = (player, location) => {
  if (!Position[player.name]) Position[player.name] = {}
  Position[player.name].end = {
    x: Math.floor(location.x),
    y: Math.floor(location.y),
    z: Math.floor(location.z),
    lastChange: Date.now()
  }
  return Untravel.sendMsgToPlayer(player,`§3Puesto final-pos en coordenadas §bx: ${Math.floor(location.x)} z: ${Math.floor(location.z)}`);
}

/**
 * @param {Player} player 
 * @param {number} args 
 */
const ClaimConfirm = async (player, price) => {
  if (price <= 0) return true
  const ConfirmUI = new ui.MessageFormData()
    .title(Config.serverTitle("CONFIRMACION  DE COMPRA"))
    .body(`§3Reclamar Dominio por §g${await Untravel.formatMoney(price)}§r?`)
    .button2("§l§bACEPTAR")
    .button1("§l§cCANCELAR")

  player.sendMessage(Config.FormMessage)
  let res = await Untravel.ForceOpen(player, ConfirmUI)
  if (!res.canceled) {
    if (res.selection == 1) return true
  }
  return false
}

/**
 * @param {Player} player 
 * @param {string[]} args 
 */
const ClaimFunction = async (player, args) => {
  if (!Position[player.name])
    return Untravel.sendMsgToPlayer(player,"§cNo has puesto la posicion.")
  if (!Position[player.name].start)
    return Untravel.sendMsgToPlayer(player,"§cNo has puesto la posicion inicial.")
  if (!Position[player.name].end)
    return Untravel.sendMsgToPlayer(player,"§cNo has puesto la posicion final.")

  const { start, end } = Position[player.name];
  const calculatedSize = Land.calculateLandSize(start, end);
  let moneyCost = Setting.get("moneyCostperBlock") * calculatedSize
  if (!player.isAdmin()) {
    if (Setting.get("costClaimBlock") && calculatedSize > player.getClaimBlock())
      return Untravel.sendMsgToPlayer(player, `§cClaim blocks Insuficintes. Necesitas: ${calculatedSize - player.getClaimBlock()} mas.`)
    
    const playerMoney = await player.getMoney()
    if (moneyCost > playerMoney)
      return Untravel.sendMsgToPlayer(player,`§cFondos insuficientes. §bPrecio: ${await Untravel.formatMoney(moneyCost)}`)

    const checkOverlap = Land.checkOverlap(start, end, player)
    if (checkOverlap.isInside)
      return Untravel.sendMsgToPlayer(player,`§cTu Dominio esta sobreponiendo con el Dominio de alguien más`);
  }
    const Confirm = await ClaimConfirm(player, moneyCost)
    if (!Confirm) {
      delete Position[player.name]
      return Untravel.sendMsgToPlayer(player,"§cCancelado!")
    }
  
  const landResult = await Land.createLand(player, { x: start.x, z: start.z }, { x: end.x, z: end.z })
  delete Position[player.name]


  if (!landResult.created)
    return Untravel.sendMsgToPlayer(player,`§cTu Dominio se esta sobreponiendo con Dominio de alguien más`);

  if (!player.isAdmin()) {
    await player.setMoney(playerMoney - moneyCost)
    if (Setting.get("costClaimBlock")) player.setClaimBlock(Untravel.getClaimBlock(player) - calculatedSize)
  }

  const landCenter = Land.getCenter(start, end)
  Log(`[Domain] ${player.name} creo el Dominio en ${player.dimension.id} | x: ${landCenter.x} z: ${landCenter.z}`)
  return Untravel.sendMsgToPlayer(player,`§3Creado exitosamente el nuevo Dominio${moneyCost > 0 ? ` §3con precio: §b${await Untravel.formatMoney(moneyCost)}.` : "."}`);
}

/**
 * @param {Player} player 
 */
const ListFunction = async (player) => {
  const playerLands = Land.getLands(player.name);
  if (playerLands.length === 0)
    return Untravel.sendMsgToPlayer(player,"§3----- Tus Dominios -----\n§bNo se encotro Dominios.");

  const lands = []
  let landCount = 1
  playerLands
    .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
    .forEach(
      (land) => {
        lands.push(`§3#${landCount}. §9Domian: \n §3» §9Dimension: §b${land.landDimension.split(":")[1]
          }\n §3» §9Position: ${land.landCenter.x}, ${land.landCenter.z}\n §3» §9Members: §b${land.invites.join(", ") || "None."
          }\n §3» §9Created at: §f${land.creationDate || 0}`)
        landCount += 1
      })
  return Untravel.sendMsgToPlayer(player,`§3----- Tus Dominios -----\n${lands.join("\n\n")}`);
}

/**
 * @param {Player} player 
 */
const UnClaimFunction = async (player) => {
  const land = Land.testLand(player.dimension.getBlock(player.location).below().location, player.dimension)
  if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cTienes que estar dentro del Dominio!")
  if (land.owner != player.name && !player.isAdmin()) return Untravel.sendMsgToPlayer(player,"§cNo tienes permisos!")
  const { start, end } = land.data.land
  const calculatedSize = Land.calculateLandSize(start, end);
  let deleteResult = await Land.deleteLand(land.id, land.owner)
  if (deleteResult.error) return Untravel.sendMsgToPlayer(player,deleteResult.error)
  if (player.name == land.owner) Untravel.setClaimBlock(player, Untravel.getClaimBlock(player) + calculatedSize)
  return Untravel.sendMsgToPlayer(player,"§3Se eliminió este Dominio!")
}

/**
 * @param {Player} player 
 * @param {string[]} args 
 */
const InviteFunction = async (player, args) => {
  if (!args[0]) return Untravel.sendMsgToPlayer(player,"§cIIngresa un nombre de Jugador.")
  let targetPlayer = world.getAllPlayers().find(p => p.name == args[0])
  if (targetPlayer != undefined) {
    if (player == targetPlayer) return Untravel.sendMsgToPlayer(player,"§cNo te puedes invitar a ti mismo.")
    const land = Land.testLand(player.location, player.dimension)
    if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cDedes estar dentro del Dominio!")
    if (land.owner != player.name) return Untravel.sendMsgToPlayer(player,"§cNo tienes permisos!")
    if (land.invites.includes(targetPlayer.name)) return Untravel.sendMsgToPlayer(player,`§c${targetPlayer.name} ya es miembro del Dominio!`)
    await Land.invitePlayer(land.id, player.name, targetPlayer.name)
    Untravel.sendMsgToPlayer(targetPlayer,`§b${player.name} §3te dio acceso a su Dominio.`)
    Untravel.sendMsgToPlayer(player,"§3invitado exitosamente!")
  } else {
    return Untravel.sendMsgToPlayer(player,"§cNo hay objetivos que coincidan con el selector")
  }
}

/**
 * @param {Player} player 
 * @param {string[]} args 
 */
const KickFunction = async (player, args) => {
  if (!args[0]) return Untravel.sendMsgToPlayer(player,"§cIngresa un nombre de Jugador.")
  let targetPlayer = world.getAllPlayers().find(p => p.name == args[0])
  if (targetPlayer != undefined) {
    if (player == targetPlayer) return Untravel.sendMsgToPlayer(player,"§cNo te puedes expulsar a ti mismo.")
    const land = Land.testLand(player.location, player.dimension)
    if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cDedes estar dentro del Dominio!")
    if (land.owner != player.name) return Untravel.sendMsgToPlayer(player,"§cNo tienes permisos!")
    if (!land.invites.includes(targetPlayer.name)) return Untravel.sendMsgToPlayer(player,`§c${targetPlayer.name} no es miembro del Dominio!`)
    await Land.removeInvite(land.id, player.name, targetPlayer.name)
    Untravel.sendMsgToPlayer(targetPlayer,`§b${player.name} §3removío tu acceso a su Dominio.`)
    Untravel.sendMsgToPlayer(player,"§3Expulsado correctamente !")
  } else {
    return Untravel.sendMsgToPlayer(player,"§cNo hay objetivos que coincidan con el selector")
  }
}

/**
 * @param {Player} player 
 * @param {string[]} args 
 */
const TransferOwnershipFunction = async (player, args) => {
  if (!args[0]) return Untravel.sendMsgToPlayer(player,"§cIngresa un nombre de Jugador.")
  let targetPlayer = world.getAllPlayers().find(p => p.name == args[0])
  if (targetPlayer != undefined) {
    const land = Land.testLand(player.location, player.dimension)
    if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cDebes estar dentro del Dominio!")
    if (land.owner != player.name) return Untravel.sendMsgToPlayer(player,"§cNo tienes permisos!")
    if (player == targetPlayer) return Untravel.sendMsgToPlayer(player,"§cNo eres el propietario de este Dominio.")
    await Land.transferOwnership(land.id, player.name, targetPlayer.name)
    Untravel.sendMsgToPlayer(targetPlayer,`§b${player.name} §3Te transfirió la Propiedad.`)
    Untravel.sendMsgToPlayer(player,`§3 Transferencia de Propiedad exitosa a §b${targetPlayer.name}.`)
  } else {
    return Untravel.sendMsgToPlayer(player,"§cNo hay objetivos que coincidan con el selector")
  }
}

/**
 * @param {Player} player 
 */
const PlayerLandFunction = async (player, args) => {
  if (args[0]) {
    let targetPlayer = world.getAllPlayers().find(p => p.name == args[0])
    if (targetPlayer) return PlayerLand(player, targetPlayer.name)
  }
  let players = world.getAllPlayers().map(p => p.name)
  Object.keys(Land.getAllLands()).forEach(p => {
    if (!players.includes(p)) players.push(p)
  })
  players = players.sort((a, b) => a.localeCompare(b))
  if (players.length <= 0) return Untravel.sendMsgToPlayer(player,"§cNo se detectaron Jugadores")
  let playerPanel = new ui.ActionFormData()
    .title(Config.serverTitle("Jugadores"))
    .body(`§3Jugadores en Linea : §b${world.getAllPlayers().length}`)
  players.forEach(p => {
    playerPanel.button(`§l§b${p} ${world.getAllPlayers().find(pl => pl.name == p) == undefined ? "" : "§1(§fOnline§1)"}`)
  })

  Untravel.ForceOpen(player, playerPanel).then(res => {
    if (!res.canceled) {
      const targetName = players[res.selection]
      return PlayerLand(player, targetName)
    }
  })
}

/**
 * @param {Player} player 
 * @param {Player} targetPlayer 
 */
const PlayerLand = (player, targetName) => {
  const PlayerLands = Land.getLands(targetName)
  let count = 1
  let landPanel = new ui.ActionFormData()
    .title(Config.serverTitle(`${targetName}'s Domains`))
    .body(`§3Dominios : §b${PlayerLands.length}`)
  PlayerLands.forEach(p => {
    landPanel.button(`§b#${count}\n§0X: ${p.landCenter.x} | Z: ${p.landCenter.z}`)
    count += 1
  })
  landPanel.button("§l§9<== ATRAS")

  Untravel.ForceOpen(player, landPanel).then(res => {
    if (!res.canceled) {
      let land = PlayerLands[res.selection]
      if (!land) return PlayerLandFunction(player, [])
      let landPanel = new ui.ActionFormData()
        .title(Config.serverTitle(`${targetName}'s Domains`))
        .body(`§3#${res.selection + 1}. §9Dominio: \n §3» §9Dimension: §b${land.landDimension.split(":")[1]
          }\n §3» §9Position: ${land.landCenter.x}, ${land.landCenter.z}\n §3» §9Members: §b${land.invites.join(", ") || "None."
          }\n §3» §9Created at: §f${land.creationDate || 0}`)

        .button("§l§3Teleport")
        .button("§l§4Delete")
        .button("§l§9<== ATRAS")

      Untravel.ForceOpen(player, landPanel).then(res => {
        if (!res.canceled) {
          switch (res.selection) {
            case 0:
              land.landCenter.y = player.location.y
              return player.teleport(land.landCenter)
            case 1:
              const deleteLand = Land.deleteLand(land.landId, targetName)
              if (deleteLand.error) {
                if (deleteLand.error == "NotFound") return Untravel.sendMsgToPlayer(player,"§cDominio no encontrado!")
              } else return Untravel.sendMsgToPlayer(player,"§3Dominio borrado correctamente!")
            default:
              return PlayerLand(player, targetName)
          }
        }
      })
    }
  })
}

/**
 * 
 * @param {Player} player 
 * @returns 
 */
const InfoFunction = (player) => {
  const land = Land.testLand(player.location, player.dimension)
  if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cDebes estar dentro de un Dominio!")
  Untravel.sendMsgToPlayer(player,`§3Informacion del Dominio:\n §3» §9Owner: §b${land.owner}\n §3» §9Members: §b${land.invites.join(", ") || "None."}`);
  if (!CooldownMark.includes(player.name)) {
    const { start, end } = land.data.land
    CooldownMark.push(player.name)
    const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, player.location.y), 5)
    system.runTimeout(() => {
      system.clearRun(particle)
      CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
    }, 20 * 5)
  }
}
/**
 * 
 * @param {Player} player 
 */
const SettingsFunction = async (player) => {
  const SettingList = {
    "Allow Building": "building",
    "Allow Breaking": "breaking",
    "Allow Open Container": "openContainer",
    "Allow Open Door": "openDoor",
    "Allow Push Button": "pushButton",
    "Allow Use Lever": "useLever",
    "Allow Interact with Mobs": "interactWithMobs"
  }

  const land = Land.testLand(player.location, player.dimension)
  if (!land.isInside) return Untravel.sendMsgToPlayer(player,"§cDebes estar dentro del land!")
  if (land.owner != player.name) return Untravel.sendMsgToPlayer(player,"§cNo tienes permisos!")

  const SettingUI = new ui.ModalFormData()
    .title("Domain Settings")
  Object.keys(SettingList).forEach(settingName => {
    SettingUI.toggle(settingName, land.setting[SettingList[settingName]])
  })

  Untravel.ForceOpen(player, SettingUI).then(async res => {
    if (!res.canceled) {
      const newSetting = {}
      for (let i = 0; i < res.formValues.length; i++) {
        const settingName = Object.keys(SettingList)[i]
        const setting = SettingList[settingName]
        const value = res.formValues[i]

        newSetting[setting] = value
      }

      await Land.setSetting(land.id, player.name, newSetting)
      return Untravel.sendMsgToPlayer(player,"§3Ajustes Guadados!")
    }
  })
}

// Domain System
const checkPermission = (player, location, data) => {
  if (data.cancel || player.isAdmin()) return
  const land = Land.testLand(location, player.dimension)
  if (land.isInside) {
    if (land.owner != player.name && !land.invites.includes(player.name)) {
      data.cancel = true
      const Cooldown = CooldownNotify[player.name] ?? (Date.now() - 500)
      if (Date.now() - Cooldown >= 500) Untravel.sendMsgToPlayer(player,`§cNo puedes hacer eso aqui! Land owner: §e${land.owner}.`)
      CooldownNotify[player.name] = Date.now()
      if (!CooldownMark.includes(player.name)) {
        const { start, end } = land.data.land
        CooldownMark.push(player.name)
        const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, location.y), 5)
        system.runTimeout(() => {
          system.clearRun(particle)
          CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
        }, 20 * 3)
      }
    }
  }
}

// Domain Claim by Item
const CooldownSet = {}
world.beforeEvents.itemUseOn.subscribe(data => {
  if (data.cancel) return
  const { source } = data
  if (data.itemStack.typeId == Setting.get("itemClaimLand")) {
    const Cooldown = CooldownSet[source.name] ?? Date.now()
    data.cancel = true
    if (Cooldown > Date.now()) return
    if (data.source.isSneaking) {
      EndPos(data.source, data.block.location)
    } else {
      StartPos(data.source, data.block.location)
    }
    CooldownSet[source.name] = Date.now() + 500
  }
})

// Particle


system.runInterval(() => {
  for (const playerName in Position) {
    const location = Position[playerName]
    const startLocation = location.start
    const endLocation = location.end
    if (startLocation && (Date.now() - startLocation.lastChange) >= 300000) delete Position[playerName].start
    if (endLocation && (Date.now() - endLocation.lastChange) >= 300000) delete Position[playerName].end
  }
}, 5)

system.runInterval(() => {
  for (const playerName in Position) {
    const location = Position[playerName]
    const startLocation = location.start
    const endLocation = location.end
    const player = world.getAllPlayers().find(p => p.name == playerName)
    if (startLocation && endLocation) {
      ParticleLand(startLocation, endLocation, player.dimension, Math.max(startLocation.y, endLocation.y))
    } else {
      if (startLocation) player.dimension.spawnParticle(Setting.get("particleClaim"), { x: startLocation.x + 0.5, y: startLocation.y + 1.30, z: startLocation.z + 0.5 })
      if (endLocation) player.dimension.spawnParticle(Setting.get("particleClaim"), { x: endLocation.x + 0.5, y: endLocation.y + 1.30, z: endLocation.z + 0.5 })
    }
  }
}, 10)



const Notify = (player, text) => {
  switch (Setting.get("notifyLand").toLowerCase()) {
    case "chat":
      return Untravel.sendMsgToPlayer(player,text)

    case "actionbar":
      return Action.setAction(player, 3, text)//player.onScreenDisplay.setActionBar(text)

    case "title":
      return player.onScreenDisplay.setTitle(text)

    default:
      return
  }
}

const LandLog = {}
system.runInterval(() => {
  world.getAllPlayers().forEach(player => {
    const moving = isMoving(player)
    if (!moving) return
    if (player.location.y <= -63) return
    let land = Land.testLand(player.dimension.getBlock(player.location).below().location, player.dimension)
    if (!land.isInside && LandLog[player.name]) {
      land = LandLog[player.name]
      delete LandLog[player.name]
      Notify(player, `§9Saliste del Dominio de §3${land.owner}.`)
    } else if (land.isInside) {
      if (!LandLog[player.name]) {
        LandLog[player.name] = land
        Notify(player, `§9Entraste al Dominio de §3${land.owner}.`)
      } else {
        const landOld = LandLog[player.name]
        if (landOld.owner != land.owner && landOld.id != land.id) {
          LandLog[player.name] = land
          Notify(player, `§9Entraste al Dominio de §3${land.owner}.`)
        }
      }
    }
  })
}, 5)