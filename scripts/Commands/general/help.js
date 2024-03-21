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

  const cmd = async (command, category, btn = true, commandList, ) => {
    let title = `${command.name}`
    let added = ""
    if (command.aliases) {
    added = `\n§9 Alias: \n§b${JSON.stringify(command.aliases)}`
    }
    let message = `§9Nombre :\n §3${Untravel.getPrefix()}${command.name} \n§9Uso :\n§1|§b ${Untravel.getPrefix()}${command.usage || command.name}\n§9Descripcion :\n§b(${command.description}) ${added}`
    const form = new ActionFormData().title(`${title}`).body(`${message}`)
      form.button("§l§b<<*>>")
      if (btn) {
        form.button("§l§d<<")
        player.sendMessage(`${Config.FormMessage}`)
      }
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
        return categoria(player, false)
      }
      let result = res.selection
      let selected = commands[result - 1]
      cmd(selected, category, true, commandList)
    }
  }

  const categoria = async (player, msg = true) => {
    const commandList = Untravel.cmd.getAllRegistation()
    let commandCategory = []
    let newList = []
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
      newList.push(x)
    })
    if (msg) {
      player.sendMessage(`${Config.FormMessage}`)
    }
    
    let res = await Untravel.ForceOpen(player, form)
    if (!res.canceled) {
      let result = res.selection
      let selected = newList[result]

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

    cmd(command,command.category,false)
  }




})