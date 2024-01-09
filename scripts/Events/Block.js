import { system, world } from "@minecraft/server"
import Land from "../Modules/Land/Land"
import { CooldownMark, NotifyText } from "../Modules/Log/NotifyText"
import ParticleLand from "../Modules/Land/Particle"
import Setting from "../Modules/Land/Setting"

//Break
world.beforeEvents.playerBreakBlock.subscribe(data => {
    const { player, block } = data
    if (data.cancel || player.isAdmin()) return
    const land = Land.testLand(block.location, player.dimension)
    if (land.isInside) {
      if (land.owner == player.name || land.invites.includes(player.name)) return
      data.cancel = true
      NotifyText(player, `§cNo puedes hacer eso aqui! Propietario: §e${land.owner}.`)
      if (!CooldownMark.includes(player.name)) {
        const { start, end } = land.data.land
        CooldownMark.push(player.name)
        const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, block.location.y), 5)
        system.runTimeout(() => {
          system.clearRun(particle)
          CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
        }, 20 * 3)
      }
    }
  })

  //Place
  world.beforeEvents.playerPlaceBlock.subscribe(data => {
    const { player, block } = data
    if (data.cancel || player.isAdmin()) return
    const land = Land.testLand(block.location, player.dimension)
    if (land.isInside) {
      if (land.owner == player.name || land.invites.includes(player.name)) return
      data.cancel = true
      NotifyText(player, `§cNo puedes hacer eso aqui! Propietario: §e${land.owner}.`)
      if (!CooldownMark.includes(player.name)) {
        const { start, end } = land.data.land
        CooldownMark.push(player.name)
        const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, block.location.y), 5)
        system.runTimeout(() => {
          system.clearRun(particle)
          CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
        }, 20 * 3)
      }
    }
  })

  //Interact
  world.beforeEvents.playerInteractWithBlock.subscribe(data => {
    const { player, block } = data
    if (data.cancel || player.isAdmin()) return
    const land = Land.testLand(block.location, player.dimension)
    if (land.isInside) {
      if (land.owner == player.name || land.invites.includes(player.name)) return
      data.cancel = true
      NotifyText(player, `§cNo puedes hacer eso aqui! Propietario: §e${land.owner}.`)
      if (!CooldownMark.includes(player.name)) {
        const { start, end } = land.data.land
        CooldownMark.push(player.name)
        const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, block.location.y), 5)
        system.runTimeout(() => {
          system.clearRun(particle)
          CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
        }, 20 * 3)
      }
    }
  })

  //Interact with Entity
  world.beforeEvents.playerInteractWithEntity.subscribe(data => {
    const { player, target } = data
    if (data.cancel || player.isAdmin()) return
    const land = Land.testLand(target.location, player.dimension)
    if (land.isInside) {
      if (land.owner == player.name || land.invites.includes(player.name)) return
      data.cancel = true
      NotifyText(player, `§cNo puedes hacer eso aqui! Propietario: §e${land.owner}.`)
      if (!CooldownMark.includes(player.name)) {
        const { start, end } = land.data.land
        CooldownMark.push(player.name)
        const particle = system.runInterval(() => ParticleLand(start, end, player.dimension, target.location.y), 5)
        system.runTimeout(() => {
          system.clearRun(particle)
          CooldownMark.splice(CooldownMark.findIndex(p => p == player.name), 1)
        }, 20 * 3)
      }
    }
  })


  
world.beforeEvents.explosion.subscribe(data => {
  if (!Setting.get("protectLandfromExplosion")) return
  const impact = data.getImpactedBlocks().filter(block => {
    const land = Land.testLand(block.location, block.dimension)
    return !land.isInside
  })
  data.setImpactedBlocks(impact)
})
world.beforeEvents.pistonActivate.subscribe(data => {
  if (Setting.get("allowPistonInLand")) return
  data.piston.getAttachedBlocks().forEach(location => {
    const land = Land.testLand(location, data.dimension)
    if (land.isInside) data.cancel = true
  })
})
