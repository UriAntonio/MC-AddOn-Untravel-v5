import { welcome } from "../util/newMemberMessage";
import Server from "../server";
import Config from "../conf/Configuration";


Server.world.beforeEvents.itemUse.subscribe((data) => {
    const source = data.source
    const items = data.itemStack
    if (items.typeId === "mx:new" &&
        source.hasTag(Config.AdminTag)) {
        welcome(source);
    }
})
