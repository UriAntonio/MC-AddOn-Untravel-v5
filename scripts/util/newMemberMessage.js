import { system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";


export function welcome(playerid) {
   
  system.run(() => {
  let wel = new ActionFormData()
  .title(`★━━━━━━━━<§oBienvenido§r>━━━━━━━━★`)
  .body(
    `\n§rBienvenido a Untravel §d${playerid.nameTag}§r. \nEsperamos y te la pases bien cualquier bug reportar con los Admins...`
  )
  .button(`...`);


  wel.show(playerid).then((result) => {
    
    if (result.canceled) {
      playerid.runCommandAsync(
        `tellraw @s {"rawtext":[{"text":"§eTu §ldebes §r§ede seleccionar tu Don"}]}`
      )
      //player.runCommandAsync(
      //  `replaceitem entity @s slot.hotbar 0 air 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"},"minecraft:keep_on_death":{}}`
      //);
    } else {
     console.log("Your result was: " + result.selection);
     playerid.addTag("online");
  }
})
})}






