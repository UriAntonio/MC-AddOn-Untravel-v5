import { world } from "@minecraft/server";
const overworld = world.getDimension("overworld");
const { fromCodePoint } = String

const cfg = {
  prefix: "-",
  lockServer: false,
  server: `§r§b■§d§lUntravel§eMx§b■§r`,
  debug: true,
  sendMsgToPlayer: (target, message) => {
    try {
      target.runCommandAsync(
        `tellraw @s {"rawtext":[{"text":${JSON.stringify(
          Array.isArray(message) ? message.join("\n\u00a7r") : message
        )}}]}`
      );
    } catch {}
  },
  sendMsg: (target, message) => {
    try {
      overworld.runCommandAsync(
        `tellraw ${
          /^ *@[spear]( *\[.*\] *)?$/.test(target)
            ? target
            : JSON.stringify(target)
        } {"rawtext":[{"text":${JSON.stringify(
          Array.isArray(message) ? message.join("\n\u00a7r") : message
        )}}]}`
      );
    } catch {}
  },
  symbols: {
    heart: fromCodePoint(0xe200),
    pen: fromCodePoint(0xe201),
    starShine: fromCodePoint(9733),
    oder: "\uD83D\uDCA9",
  },
  tagTitle(player, titleTag, titleName) {
    let tags = player.getTags();
    let titleOne = "Un Dios Desconocido";
    for (const tag of tags) {
      if (tag.startsWith("Title:")) {
        titleOne = tag.replace("Title:", "");
        titleOne = titleOne.replaceAll("--", "§o§7><§r");
      }
    }
    titleName = `§7<§3${titleOne}§7>§r §7${player.name}§r`;
    titleTag = `§7<§3${titleOne}§7>§r`;
    return titleTag, titleName;
  },
  banMessage(player) {
    let tags = player.getTags();
    let reason = "N/A";
    let by = "N/A";
    // this removes old ban stuff
    tags.forEach((t) => {
      if (t.startsWith("By:")) by = t.slice(3);
      if (t.startsWith("Reason:")) reason = t.slice(7);
    });
    try {
      player.runCommandAsync(
        `kick ${JSON.stringify(
          player.name
        )} §r\n§l§cFUISTE BANNEADO!\n§r\n§eBanned Por:§r ${by}\n§bRazon:§r ${reason}\n§6Si piensas que hubo un error comunicate con los administradores. `
      );
    } catch (error) {
      // if we cant kick them with /kick then we instant despawn them
      //    player.triggerEvent("paradox:kick");
    }
  },
  getScore(playerSelect, score) {
    return world.scoreboard.getObjective(score).getScore(playerSelect.scoreboard);
  },
  encryption: {
    key: "7231##7231",
},
};

const motionFrames = [
  "■-------------------",
  "■■------------------",
  "■■■-----------------",
  "■■■■----------------",
  "■■■■■---------------",
  "■■■■■■--------------",
  "■■■■■■■-------------",
  "■■■■■■■■------------",
  "■■■■■■■■■-----------",
  "■■■■■■■■■■----------",
  "■■■■■■■■■■■---------",
  "■■■■■■■■■■■■--------",
  "■■■■■■■■■■■■■-------",
  "■■■■■■■■■■■■■■------",
  "■■■■■■■■■■■■■■■-----",
  "■■■■■■■■■■■■■■■■----",
  "■■■■■■■■■■■■■■■■■---",
  "■■■■■■■■■■■■■■■■■■--",
  "■■■■■■■■■■■■■■■■■■■-",
  `■■■■■■■■■■■■■■■■■■■${globalThis.star}`,
];

export { cfg, motionFrames };
