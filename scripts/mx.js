import { onJoin } from "./Events/playerSpawn";
import { chatFilter } from "./Events/chatSend";
import { itemUses } from "./Events/itemUse";
import "./server"

onJoin()
itemUses()
chatFilter()

