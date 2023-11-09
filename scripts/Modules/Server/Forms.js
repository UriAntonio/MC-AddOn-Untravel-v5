import * as mc from "@minecraft/server"
import * as ui from "@minecraft/server-ui"

/**
 * 
 * @param {mc.Player} player 
 * @param {ui.ActionFormData | ui.MessageFormData | ui.ModalFormData} form 
 * @returns {Promise<ui.ActionFormResponse | ui.MessageFormResponse | ui.ModalFormResponse>}
 */
const ForceOpen = async (player, form, timeout = 1200) => {
    let startTick = mc.system.currentTick
    while ((mc.system.currentTick - startTick) < timeout) {
        const response = await form.show(player)
        if (response.cancelationReason !== "UserBusy")
            return response
    }
    return undefined
}



export { ForceOpen }