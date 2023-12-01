import { ActionFormData } from "@minecraft/server-ui";
import Server from "../../server";
import { salonData, arenaData, lavaData, picinaData, bedrockData } from "./Data/coliseoCommnads";


function enemigos(player) {

    Server.System.run(() => {

        let enemies = new ActionFormData()
            .title(`§b■§9§lEnemigos§r§b■`)
            .body(`§cCuidado`
                + `\n   §bEl escenario default es el §fSalon§b.`
                + `\n   La §gArena§b es perfecta para PVP.`
                + `\n   El §cFoso de Lava§b es bastante caliente.`
                + `\n   Date un chapuzon en la §3Picina Olimpica§b.`
                + `\n   Saca tu mejor armadura y pelea contra el wither en la §1Jaula de Berdrock.`
                + `\n§9(5/5)`
            )
            .button(`§2§lZombie\n§9Todas las P.`)
            .button(`§f§lEsqueleto\n§9Todas las P.`)
            .button(`§c§lBlaze\n§9P.3, P.5`)
            .button(`§b§lGuardian\n§9P.4`)
            .button(`§0§lWither\n§9P.5`);



        enemies.show(player).then((result) => {

            if (result.canceled) {
                Coliseo(player)
            }
        })
    })
}

function plataformas(player) {

    Server.System.run(() => {

        let platform = new ActionFormData()
            .title(`§b■§9§lPlataformas§r§b■`)
            .body(`§cCuidado`
                + `\n   §bEl escenario default es el §fSalon§b.`
                + `\n   La §gArena§b es perfecta para PVP.`
                + `\n   El §cFoso de Lava§b es bastante caliente.`
                + `\n   Date un chapuzon en la §3Picina Olimpica§b.`
                + `\n   Saca tu mejor armadura y pelea contra el wither en la §1Jaula de Berdrock.`
                + `\n§9(5/5)`
            )
            .button(`§0§lSalon\n§9(1/5)`)
            .button(`§g§lArena\n§9(2/5)`)
            .button(`§c§lFoso de Lava\n§9(3/5)`)
            .button(`§b§lPicina Olimpica\n§9(4/5)`)
            .button(`§8§lJaula de Bedrock\n§9(5/5)`);



        platform.show(player).then((result) => {

            if (result.canceled) {
                Coliseo(player)
            }
            if (result.selection == 0) {//Salon

                for (let i = 0; i < salonData.length; i++) {
                    try {
                        player.runCommandAsync(`${salonData[i]}`);
                    } catch (error) {
                        player.sendMessage(`error: ${error}`)
                    }
                }
                Coliseo(player);
            }
            if (result.selection == 1) {//Arena

                for (let i = 0; i < arenaData.length; i++) {
                    try {
                        player.runCommandAsync(`${arenaData[i]}`);
                    } catch (error) {
                        player.sendMessage(`error: ${error}`)
                    }
                }
                Coliseo(player);
            }
            if (result.selection == 2) {//Foso de Lava

                for (let i = 0; i < lavaData.length; i++) {
                    try {
                        player.runCommandAsync(`${lavaData[i]}`);
                    } catch (error) {
                        player.sendMessage(`error: ${error}`)
                    }
                }
                Coliseo(player);
            }
            if (result.selection == 3) {//Picina

                for (let i = 0; i < picinaData.length; i++) {
                    try {
                        player.runCommandAsync(`${picinaData[i]}`);
                    } catch (error) {
                        player.sendMessage(`error: ${error}`)
                    }
                }
                Coliseo(player);
            }
            if (result.selection == 4) {//Jaula

                for (let i = 0; i < bedrockData.length; i++) {
                    try {
                        player.runCommandAsync(`${bedrockData[i]}`);
                    } catch (error) {
                        player.sendMessage(`error: ${error}`)
                    }
                }
                Coliseo(player);
            }
            
        })
    })
}

 function Coliseo(player) {

    Server.System.run(() => {

        let ui_Coliseo = new ActionFormData()
            .title(`§b■§9§lColiseo Manager§r§b■`)
            .body(`     §9Bienvenidos al Coliseo`
                + `\n§bAqui donde la sangre de heroes fue derramada`
                + `\nAqui podras encontrar:`
                + `\n   §l§9Enemigos§r`
                + `\n§bPuedes invocar mobs enemigos para luchar`
                + `\n   §l§9Cinco diferentes escenarios§r   `
                + `§bMira todas los modos de juego`
            )
            .button(`§3§lPlataformas`)
            .button(`§c§lEnemigos`)
            .button(`§b■§9§lSalir§r§b■`)



        ui_Coliseo.show(player).then((result) => {

            if (result.canceled) {
                Coliseo(player)
            } if (result.selection == 0) {
                plataformas(player)
                player.runCommandAsync(`playsound mob.shulker.open @s`)
            }
            if (result.selection == 1) {
                enemigos(player)
                player.runCommandAsync(`playsound mob.shulker.open @s`)
            }
            if (result.selection == 2) {
                player.runCommandAsync(`playsound mob.shulker.close @s`)
                Database.set("coliseoManager", true)
            }
        })
    })
}

export function coliseoCost (player) {

    Server.System.run(() => {
        let cost = 1
        let ui_Coliseo = new ActionFormData()
            .title(`§b■§9§lColiseo§r§b■`)
            .body(`     §9Bienvenidos al Coliseo`
                + `\n§bAqui donde la sangre de heroes fue derramada`
                + `\nAqui podras encontrar:`
                + `\n   §l§9Enemigos§r`
                + `\n§bPuedes invocar mobs enemigos para luchar`
                + `\n   §l§9Cinco diferentes escenarios§r   `
                + `§bMira todas los modos de juego`
            )
            .button(`§6§lPagar ${cost}`)
            .button(`§0§lSalir`)



        ui_Coliseo.show(player).then((result) => {

            if (result.canceled) {
                player.runCommandAsync(`playsound mob.shulker.close @s`)
            } if (result.selection == 0) {
                player.runCommandAsync(`playsound mob.shulker.open @s`)
                player.runCommandAsync(`playsound random.levelup @s`)
                Coliseo(player)
            }
            if (result.selection == 1) {
                player.runCommandAsync(`playsound mob.shulker.close @s`)
            }
        })
    })
}