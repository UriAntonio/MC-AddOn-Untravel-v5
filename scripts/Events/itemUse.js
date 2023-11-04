import { welcome } from "../util/newMemberMessage";
import Server from "../server";

export const itemUses = () => {
    Server.world.beforeEvents.itemUse.subscribe((data) => {
        const source = data.source
        const items = data.itemStack
        if (items.typeId === "mx:new" &&
        !source.hasTag("online")) {
            welcome(source);
          }
    })
}