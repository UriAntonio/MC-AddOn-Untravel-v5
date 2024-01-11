import Untravel from "../../Untravel"
import Config from "../../conf/Configuration"
import { getCooldown, setCooldown } from "../../Modules/Tempo/Cooldown"
import Money from "../../Modules/Finance/Money"
import Fund from "../../Modules/Finance/Funds"
import Action from "../../Modules/Log/ActionLog"
import { ActionFormData, ModalFormData } from "@minecraft/server-ui"
import untravel from "../../Extensions/untravel"
import { ForceOpen } from "../../Modules/Server/Forms"
import { Log } from "../../Modules/Log/Log"

const HomeDB = Untravel.HomeDB
const { symbols: { myPoint, whiteConfig, less, plus, equis } } = untravel

Untravel.cmd.add({
  name: "home",
  description: `Comando MUY poderoso para\n teletransporte a el hogar seleccionado; \nImpuesto Magico en Overworld, Nether, End: §f${Config.homeTpCost}, ${Config.homeTpCostNether}, ${Config.homeTpCostEnd}§b, \nEnfriamiento: ${Config.homeCooldown} §b`,
  usage: "home <home_name>",
  aliases: ["hm"],
  category: "Home"
}, async (data, player, args) => {
  let title = Config.serverTitle(`HOME`)
  let message = ""
  let cost = Config.homeTpCost
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  let homeArr = []

  if (player.isCombat()) return player.sendMessage(`${Config.serverStyler}§cEstas en Combate!`)
  HomeDB.forEach((key, value) => {
    if (!key.includes(player.name)) return
    let hname = key.substring(`${player.name}-`.length)
    homeArr.push(hname)
  })
  if(homeArr.lenght < 1) homeArr = ["Sin Homes"]
  const form = new ActionFormData().title(`${title}`).body(`${message}`)
  form.button(`${whiteConfig} §l§fEditar`)
  homeArr.forEach(x => {
    let y = HomeDB.get(`${player.name}-${x}`)
    form.button(`${myPoint} §f${x} §1| §b${Math.round(y.x)}, ${Math.round(y.y)}, ${Math.round(y.z)}\n§9${y.dimension}`)
  })
  player.sendMessage(`${Config.FormMessage}`)
  let res = await ForceOpen(player, form)
  if (!res.canceled) {
    if (res.selection == 0) {
      return config(player)
    }
    let result = res.selection
    let selected = homeArr[result - 1]
    if (selected == "Sin Homes") return player.sendMessage(`${Config.serverStyler}§cNo hay Homes agregados`)
    let playerHome = HomeDB.get(`${player.name}-${selected}`)

    if (!player.isAdmin()) {
      if (playerHome.dimension == "minecraft:nether" || player.dimension.id == "minecraft:nether") cost = Config.homeTpCostNether
      if (playerHome.dimension == "minecraft:end" || player.dimension.id == "minecraft:end") cost = Config.homeTpCostEnd

      if (balance < cost) return player.sendMessage(`${Config.serverStyler}§cNo cuentas con fondos suficiente. Costo: §f${cost}`)
      if (getCooldown("home", player) > 0) return player.sendMessage(`${Config.serverStyler}§cYa has usado el comando home! En enfriamiento por: §f${getCooldown("home", player)}s`)
      let homeCD = Untravel.Setting.get("homeCooldown") ?? Config.homeCooldown
      setCooldown("home", player, homeCD)
      let homeCountdown = Untravel.Setting.get("homeCountdown") ?? Config.homeCountdown
      if (homeCountdown > 0) {
        player.sendMessage(`${Config.serverStyler}§bNo te muevas por: §f${homeCountdown}§b segundos para Teletransportarte!`)
        let playerPosition = player.location
        let cancel = false
        let canceled = false
        let countdown = homeCountdown
        for (let i = 0; i < homeCountdown; i++) {
          if (player.isCombat() || player.location.x != playerPosition.x || player.location.y != playerPosition.y || player.location.z != playerPosition.z) cancel = true
          if (cancel) {
            if (!canceled) player.sendMessage(`${Config.serverStyler}§cCancelado!`)
            canceled = true
            return;
          }
          Action.setAction(player, 2, `${Config.serverStyler}§bNo te muevas por: §f${countdown}s`)
          countdown--
          await Untravel.sleep(1000)
          Action.setAction(player, 2, `${Config.serverStyler}§bNo te muevas por: §f${countdown}s`)

        }
      }
      Money.setMoney(player.name, balance - cost)
      Fund.setMoney(balanceFund + cost)
      player.sendMessage(`${Config.serverStyler}§3Teletransportando...`)
      await Untravel.teleportPlayer(player, playerHome, { dimension: Untravel.getDimension(playerHome.dimension) })
      player.sendMessage(`${Config.serverStyler}§3Teletransportado Correctamente.`)
      return
    }
    player.sendMessage(`${Config.serverStyler}§3Teletransportando...`)
    await Untravel.teleportPlayer(player, playerHome, { dimension: Untravel.getDimension(playerHome.dimension) })
    player.sendMessage(`${Config.serverStyler}§3Teletransportado Correctamente.`)

  }




})

const setHome = async (player) => {
  let title = Config.serverTitle("Agrega Home")
  let homeArr = []
  let cost = Config.homeCost
  HomeDB.forEach((key, value) => {
    if (key.startsWith(player.name)) {
      let hname = key.substring(`${player.name}-`.length)
      homeArr.push(`${hname}`);
    }
  })
  for (let i = 0; i < homeArr.length; i++) {
    cost = cost + cost;

  }
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  let homeCount = HomeDB.keys().filter(t => t.startsWith(player.name)).length
  if (!player.isAdmin() && homeCount >= (Untravel.Setting.get("homeLimit") ?? Config.homeLimit))
    return player.sendMessage(`${Config.serverStyler}§cYa tienes el Maximo de hogares!`)

  const Form = new ModalFormData().title(`${title}`)
  Form.textField(`Costo: §g${cost}\n§rNombre: \n`, "")

  let res = await ForceOpen(player, Form)
  if (!res.canceled) {
    if (res.formValues != undefined) {
      if (res.formValues[0].length > 12) {
        player.sendMessage(`${Config.serverStyler}§c Demaciado Largo, El maximo de caracteres es 12!`)
      }
      if (res.formValues[0].length < 3) {
        player.sendMessage(`${Config.serverStyler}§c Demaciado Costo, El minimo de caracteres es 3!`)
      } else {
        let name = res.formValues[0]
        let playerHome = HomeDB.keys().find(key => key == `${player.name}-${name}`)
        if (playerHome != undefined) return player.sendMessage(`${Config.serverStyler}§cNombre de hogar duplicado, hogar no fue creado.`)
        if (!player.isAdmin()) {
          if (balance < cost) return player.sendMessage(`${Config.serverStyler}§cNo cuentas con fondos suficiente. Costo: §f${cost}`)
          if (player.dimension.id == "minecraft:nether") return player.sendMessage(`${Config.serverStyler}§cLa dimension no esta habilitada para hogares`)
          if (player.dimension.id == "minecraft:end") return player.sendMessage(`${Config.serverStyler}§cLa dimension no esta habilitada para hogares`)
          const homeObject = {
            x: player.location.x,
            y: player.location.y,
            z: player.location.z,
            dimension: player.dimension.id
          }
          Money.setMoney(player.name, balance - cost)
          Fund.setMoney(balanceFund + cost)
          await HomeDB.set(`${player.name}-${name}`, homeObject)
          player.sendMessage(`${Config.serverStyler}§3Home creada exitosamente con el nombre §f${name}§3! con un costo de: §f${cost}`)
          return
        }
        const homeObject = {
          x: player.location.x,
          y: player.location.y,
          z: player.location.z,
          dimension: player.dimension.id
        }
        await HomeDB.set(`${player.name}-${name}`, homeObject)

        player.sendMessage(`${Config.serverStyler}§3Home creada exitosamente con el nombre §f${name}§3!`)

      }
    } else {
      return player.sendMessage(`${Config.serverStyler}§cIngresa un mombre para tu hogar.`)
    }

  }

}

const delHome = async (player) => {
  let title = Config.serverTitle("Eliminar Home")
  let homeArr = []
  let newArr = []
  let cost = Config.homeCost / 2
  HomeDB.forEach((key) => {
    if (key.startsWith(player.name)) {
      let hname = key.substring(`${player.name}-`.length)
      homeArr.push(`${hname}`);
    }
  })
  for (let i = 1; i < homeArr.length; i++) {
    cost = cost + cost;
  }
  if (homeArr < 1) homeArr = [`§cSin Homes`]
  homeArr.forEach(x => {
    newArr.push(x)
  })
  let balanceFund = Fund.getMoney()
  let balance = Money.getMoney(player.name)
  const Form = new ActionFormData().title(`${title}`).button(`${equis} Cancelar`)
  newArr.forEach(x => {
    if (x == `§cSin Homes`) return Form.button(`${x}`)
    Form.button(`${less} ${x}`)
  })
  const res = await ForceOpen(player, Form)
  if (!res.canceled) {
    if (res.selection == 0 ) return player.sendMessage(`${Config.serverStyler}§cNo se elimino Ningun Home.`)
    let result  = res.selection
    let name = homeArr[result -1]
    if (name == `§cSin Homes`) return player.sendMessage(`${Config.serverStyler}§cNo se elimino Ningun Home.`)
    let playerHome = HomeDB.keys().find(h => h == `${player.name}-${name}`)
    if (!player.isAdmin()) {
      Money.setMoney(player.name, balance + cost)
      Fund.setMoney(balanceFund - cost)
      await HomeDB.delete(playerHome)
      player.sendMessage(`${Config.serverStyler}§3Eliminado exitosamente el hogar con el nombre §f${name}§3! con un rembolso de: §f${cost}`)
      return
    }
    await HomeDB.delete(playerHome)
    player.sendMessage(`${Config.serverStyler}§3Eliminado exitosamente el hogar con el nombre §f${name}§3!`)

  }

}

const config = async (player) => {
  let title = Config.serverTitle("Home Config")
  const form = new ActionFormData().title(`${title}`)
  form.button(`${plus} Agregar Home`)
  form.button(`${less} Eliminar Home`)
  let res = await ForceOpen(player, form)
  if (!res.canceled) {
    res.selection == 0 ? setHome(player) : delHome(player)
  }
}
