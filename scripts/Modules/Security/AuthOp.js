import { ModalFormData } from "@minecraft/server-ui"
import Config from "../../conf/Configuration"
import { ForceOpen } from "../Server/Forms"
import Untravel from "../../Untravel"
import PlayerClass from "../PlayerClass";

let key = ""
const Owners = Untravel.Owners
/**
 * 
 * @param {PlayerClass} player 
 * @param {string} text 
 */
const opSystem = async (player, text = `§3Por favor crea una contraseña:\n`) => {

    let title = Config.serverTitle(`OP`)
    const form = new ModalFormData().title(`${title}`)
    .textField(`${text}`,'')
    player.sendMessage(Config.FormMessage)
    let response = await ForceOpen(player, form)

    if(response.formValues != undefined) {
        if(response.formValues[0].length > 20 || response.formValues[0] < 0) {
            opSystem(player, '§l>§r §c Usa max 20 caracteres')
          }else {
            key = response.formValues[0]
            keyvalidation(player)
          }
    }
}

/**
 * 
 * @param {PlayerClass} player 
 * @param {string} text 
 */
const keyvalidation = async (player,  text  = `§3Por favor confirma tu contraseña:\n`) => {
    let title = Config.serverTitle(`OP Confirm`)
    const form = new ModalFormData().title(`${title}`)
    .textField(`${text}`,'')
    player.sendMessage(Config.FormMessage)
    let response = await ForceOpen(player, form)

    if(response.formValues != undefined) { 
            if (key !== response.formValues[0]) {
                keyvalidation(player, '§l>§r §c La contraseña no coincide')
            } else {
                Owners.set(player.name, key)
                player.sendMsgToPlayer(`§b§lContraseña Guardada`)
            }
    }
}

 export default opSystem