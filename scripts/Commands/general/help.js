import Config from "../../conf/Configuration"
import Server from "../../server"

Server.Commands.register({
  name: "help",
  aliases: ["h"],
  description: " Puedes ver mas detalles de cada comando",
  usage: "help <command_name?>",
  category: "General"
}, async (data, player, args) => {
  if (!args[0]) {
    const commandList = Server.Commands.getAllRegistation()
    let commandCategory = []
    for (const command of commandList) {
      if (!commandCategory.includes(command.category)) commandCategory.push(command.category)
    }
    let helpMessage = `§1------------------------------\n§a■§6Help Mensage ("§e?§6" Esto significa que es opcional o podria no ser llenado)`
    for (const category of commandCategory) {
      if (category == "Admin" && !player.hasTag(Config.AdminTag)) continue;
      if ((Server.Setting.get(`${category.toLowerCase()}System`) ?? true) == false) continue;
      let commands = commandList.filter(c => c.category == category)
      helpMessage += `\n §9Comandos ${category} :`
      for (const command of commands) {
        if ((Server.Setting.get(`${command.settingname}System`) ?? Config.Commands[command.category.toLowerCase()][command.settingname]) == false) continue;
        helpMessage += `\n §3${Server.getPrefix()}${command.name} §1|§b ${Server.getPrefix()}${command.usage} (${command.description})`
      }
    }
    player.sendMessage(helpMessage)
  } else {
    const commandName = args[0]
    let command = Server.Commands.getRegistration(commandName)
    if (!command)
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if ((Server.Setting.get(`${command.settingname}System`) ?? Config.Commands[command.category.toLowerCase()][command.settingname]) == false)
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)
    if (command.admin && !player.hasTag("admin"))
      return player.sendMessage(`§cComando desconocido: ${commandName}. Revisa que el comando exista y que tengas permiso para usarlo.`)

    let helpMessage = `§1------------------------------\n§a■§9 Comando : ${command.name[0].toUpperCase() + command.name.substring(1)}
§3 Uso : §b${Server.getPrefix()}${command.usage || command.name}
§3 Descripcion : §b${command.description}`
    if (command.aliases) {
      helpMessage += `\n§3 Alias: §b${JSON.stringify(command.aliases)}`
    }
    player.sendMessage(helpMessage)
  }
})