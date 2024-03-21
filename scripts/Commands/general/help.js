import Config from "../Configuration.js"
import Untravel from "../../Untravel.js"
import { ActionFormData } from "@minecraft/server-ui"
import { Log } from "../../Modules/Log/Log.js"

Untravel.cmd.add({
  name: "help",
  aliases: ["h"],
  description: " Puedes ver mas detalles de cada comando",
  usage: "help <command_name?>",
  category: "General"
}, async (data, player, args) => {

  const cmd = async (command, category, commandList) => {
    let title = `${command.name}`
    let message = `§9Nombre :\n §3${Untravel.getPrefix()}${command.name} \n§9Uso :\n§1|§b ${Untravel.getPrefix()}${command.usage}\n§9Descripcion :\n§b(${command.description})`
    const form = new ActionFormData().title(`${title}`).body(`${message}`)
      .button("§l§b<<*>>")
      .button("§l§d<<")
    let res = await Untravel.ForceOpen(player, form)
    if (!res.canceled) {
      if (res.selection == 1) {
        comandos(category, commandList)
      }
    }
  }



  const comandos = async (category, commandList) => {
    let title = Config.serverTitle(`${category}`)
    let message = `§6 "§e?§6" <- significa que es opcional o podria no ser llenado \n §fSelecciona el comando para ver mas informacion`
    let commands = commandList.filter(c => c.category == category)

    const form = new ActionFormData().title(`${title}`).body(`${message}`)
      .button("§l§d<<")
    commands.forEach(x => {
      if ((Untravel.Setting.get(`${x.settingname}System`) ?? Config.Commands[x.category.toLowerCase()][x.settingname]) == false) return;
      form.button(`§b§l${x.name}`)
    })
    let res = await Untravel.ForceOpen(player, form)
    if (!res.canceled) {
      if (res.selection == 0) {
        categoria(player)
      }
      let result = res.selection
      let selected = commands[result - 1]
      cmd(selected, category, commandList)
    }
  }

  const categoria = async (player) => {
    const commandList = Untravel.cmd.getAllRegistation()
    let commandCategory = []
    for (const command of commandList) {
      if (!commandCategory.includes(command.category)) commandCategory.push(command.category)
    }

    let title = Config.serverTitle(`help`)
    let message = `§bEscoge la Categoria`

    const form = new ActionFormData().title(`${title}`).body(`${message}`)
    commandCategory.forEach(x => {
      if (x == "Admin" && !player.isAdmin()) return
      if (x == "Op" && !player.isOwner()) return;
      if ((Untravel.Setting.get(`${x.toLowerCase()}System`) ?? true) == false) return;
      form.button(`§9Comandos §b§l${x}`)
    })
    player.sendMessage(`${Config.FormMessage}`)
    let res = await Untravel.ForceOpen(player, form)
    if (!res.canceled) {
      let result = res.selection
      let selected = commandCategory[result]
      //    Log(commandList)
      //    Log(selected)
      comandos(selected, commandList)

    }

  }




  if (!args[0]) {

    categoria(player)

  } else {
    const commandName = args[0]
    let command = Untravel.cmd.getRegistration(commandName)
    if (!command)
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((Untravel.Setting.get(`${command.settingname}System`) ?? Config.Commands[command.category.toLowerCase()][command.settingname]) == false)
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if (command.admin && !player.isAdmin())
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)

    let helpMessage = `§1------------------------------\n§a■§9 Comando : ${command.name[0].toUpperCase() + command.name.substring(1)}
§3 Uso : §b${Untravel.getPrefix()}${command.usage || command.name}
§3 Descripcion : §b${command.description}`
    if (command.aliases) {
      helpMessage += `\n§3 Alias: §b${JSON.stringify(command.aliases)}`
    }
    player.sendMessage(helpMessage)
  }




})