import * as mc from "@minecraft/server"
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui"
//
import { typeIdToID } from "../Data/typeId"

/**
 * Credit:
 * Maintained by Herobrine64 & LeGend077.
*/

const number_of_1_16_100_items = 0;
const sizes = new Map([
    ['single', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['double', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]],
	['small', [`§c§h§e§s§t§s§m§a§l§l§r`, 27]], ['large', [`§c§h§e§s§t§l§a§r§g§e§r`, 54]],
	['pao_chest', [`§p§a§o§c§h§e§s§t§r`, 54]], ['shop', [`§s§h§o§p§c§h§e§s§t§r`, 54]]

]);

export const SizeType = {
	Single: "single",
	Small: "small",
	Double: "double",
	Large: "large",
	Shop: "shop"
}

export default class ChestFormData {
    #titleText; #buttonArray;

    /**
	* Make Chest Form UI
	* @param {string} size 
	*/
    constructor(size = "small") {
        const sizing = sizes.get(size) ?? [`§c§h§e§s§t§s§m§a§l§l§r`, 27];
        /**@internal */
        this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
        for (let i = 0; i < sizing[1]; i++)
        this.#buttonArray.push(['', undefined])
    }

    
	/**
	* Set Title for UI
	* @param {string} text 
	* @returns {ChestFormData}
	*/
	title(text) {
		this.#titleText += text;
		return this;
	}

    
	/**
	 * Add Item
	 * @param {number} slot 
	 * @param {string} itemName 
	 * @param {string[]} itemDesc 
	 * @param {string} iconPath 
	 * @param {number} stackSize 
	 * @param {boolean} enchanted 
	 * @returns {ChestFormData}
	 */
    button(slot, itemName, itemDesc, iconPath, stackSize = 1, enchanted = false) {
		let del = "minecraft:"
		let delmx = "mx:"
		let mx
		if (iconPath.includes("mx")) {
			mx =  iconPath.slice(delmx.length)
		}
		if (iconPath.includes("minecraft")) {
			mx = iconPath.slice(del.length)
		}
		const ID = `textures/icons/items/${mx == undefined? iconPath : mx}`//typeIdToID.get(iconPath.includes(':') ? iconPath : 'minecraft:' + iconPath)
		this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`,
		 ID
		]);
		return this;
	}
    pattern(from, pattern, key) {
		for (let i = 0; i < pattern.length; i++) {
			let del = "minecraft:"
			const row = pattern[i];
			for (let j = 0; j < row.length; j++) {
				const letter = row.charAt(j);
				if (key[letter]) {
					const slot = from[1] + j + (from[0] + i) * 9; // Calculate slot index
					const data = key[letter].data;
					const icon = key[letter].iconPath;
					const ID = `textures/icons/items/${icon.includes("minecraft")? icon.slice(del.length): icon}` //typeIdToID.get(icon.includes(':') ? icon : 'minecraft:' + icon);
					this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}§r${data?.itemName ?? ''}§r${data?.itemDesc?.length ? `\n§r${data?.itemDesc.join('\n§r')}` : ''}`,
					 ID
					])
					console.log(ID)
				}
			}
		}
		return this;
	}

    get form() {
		const form = new ActionFormData()
		form.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]?.toString())
		})

		return form
	}

    /**
	 * 
	 * @param {mc.Player} player 
	 * @returns {Promise<ActionFormResponse>}
	 */
	async show(player) {
		const form = new ActionFormData()
		form.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]?.toString());
		})
		return this.form.show(player)
	}
}