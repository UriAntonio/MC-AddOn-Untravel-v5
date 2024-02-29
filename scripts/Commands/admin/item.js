import { ItemStack, system } from "@minecraft/server";
import Untravel from "../../Untravel";
import { ModalFormData } from "@minecraft/server-ui";
import { ForceOpen } from "../../Modules/Server/Forms";
import Config from "../../Commands/Configuration.js";
import { LogWarn } from "../../Modules/Log/Log";

Untravel.cmd.add({
    name: "item",
    description: "Crea un item con lore Personalizado",
    category: "Admin",
    usage: "item",
    admin: true
}, async (data, player, args) => {
    
        const f = new ModalFormData()
        f.title('§a■§9§lITEM ADD§r§a■')
        f.textField(`§3Nombre:\n`,'')
        f.textField(`§3Tipo:\n`,'')
        f.textField(`§3Lore:\n -n para salto de linea\n`,'')
        f.textField(`§3Cantidad:\n`,'')
        player.sendMessage(Config.FormMessage)
        let response = await ForceOpen(player, f)
        
          if(response.formValues != undefined) {
            if(response.formValues[1].length > 49 && response.formValues[3] > 0) {
              player.sendMessage('§l>§r §c Very large lore, the maximum is 50 characters!')
            }else {
              system.run(()=>{
                try {
                    let inventory = player.getComponent('inventory').container
                let itm = new ItemStack(response.formValues[1], parseInt(response.formValues[3]))
                itm.nameTag = `${response.formValues[0]}`
                const itmLore = [`${response.formValues[2]}`.replace(/-n/g,`\n`)]
                itm.setLore(itmLore)
                inventory.addItem(itm)
                } catch (error) {
                    LogWarn(error)
                }
              })
            }
          }
        
      
})