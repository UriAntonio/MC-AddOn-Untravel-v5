import { Player, world } from "@minecraft/server"
import Untravel from "../../Untravel"
import { ActionFormData } from "@minecraft/server-ui"



/**
 * 
 * @param {Player} playerid 
 */
export function signos(playerid, gamemode, l) {
  const gm = gamemode
  Untravel.System.run(() => {

    let wel = new ActionFormData()
      .title(`§5§oSeñales`)
      .body(
        `§fPor favor recuerda las señales\n\n`
        + `\n§l§d>> §r§fsiguente/next\n`
        + `\n§l§d<<  §r§fatras/back\n`
        + `\n§l§b<<*>>  §r§faceptar/ok\n`
        + `\n§l§c>><<  §r§fcancelar/not\n`
      )
      .button(`§d§l>>`)


    wel.show(playerid).then((result) => {
      if (result.canceled) {
        signos(playerid, gamemode, l)
      }
      else {
        reglas(playerid, gm, l)
      }
    })
  })
}



/**
* 
* @param {Player} playerid 
*/
export function links(playerid, gamemode, l) {
  const gm = gamemode
  Untravel.System.run(() => {

    let wel = new ActionFormData()
      .title(`§5§oLinks`)
      .body(
        `Cualquier error, apelacion o sugerencia acércate a nosotros en:`
        + `\n§bsupport@untravelmx.com\n`
        + `\n§fUnete nuestro discord en:`
        + `\n§dhttps://discord.gg/yNZBAgAC\n`
      )
      .button(`§l§b<<*>>`)


    wel.show(playerid).then((result) => {

      if (result.canceled) {
        links(playerid, gamemode, l)
      }
      else {
        playerid.setGameMode(gamemode)
        playerid.teleport(l)

      }
    })
  })
}

/**
 * 
 * @param {Player} playerid 
 * @param {*} gamemode 
 * @param {*} l 
 */
export function reglas(playerid, gamemode, l) {
  const gm = gamemode
  Untravel.System.run(() => {

    let wel = new ActionFormData()
      .title(`§5§oReglas`)
      .body(
        `§cSi cancelas o te sales aqui no podras continuar en el server\n§fAl dar continuar te comprometes y aceptas cumplir las reglas, terminos y condiciones del §l§dUntravel§6Mx§r\n\n`
        + `\n§bEvita cualquier tipo de discripminacion sea de genero, raza, ideologico, religioso o politico \n§9----------`
        + `\n§bActuar de forma Honesta y Honrrada tratando a todos con respeto\n§9----------`
        + `\n§bAceptas el HueyActum y cada regla que sea añadida o quita en éste\n§9----------`
        + `\n§bEvitar el uso de software que perjudique la experiencia de juego de otros usuarios\n§9----------`
        + `\n§bAceptar las medidas o decisiones que el staff tome al tratar determinadas circunstancias\n§9----------`
        + `\n§bEresconciente de la libertad que tienes para apelar ciertas deciciones disiplinarias que respecten solo a ti mediante los canales disponibles para ello\n§9----------`
      )
      .button(`§l§d>>`)


    wel.show(playerid).then((result) => {
      if (result.canceled) {

        world.getDimension(`${playerid.dimension.id}`).runCommandAsync(`kick ${playerid.name}`)
      }
      else {
        links(playerid, gm, l)
      }
    })
  })
}