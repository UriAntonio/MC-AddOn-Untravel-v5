import { world } from "@minecraft/server";
import { welcome } from "../util/newMemberMessage";

export const itemUses = () => {
    world.beforeEvents.itemUse.subscribe((data) => {
        const source = data.source
        const items = data.itemStack
        if (items.typeId === "mx:new" &&
        !source.hasTag("online")) {
            welcome(source);
          }
    })
}