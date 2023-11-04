export const security = {
/**
 * @name banMessage
 * @param {Player} player - El jugador objetivo
 */
banMessage(player) {
    let tags = player.getTags();
    let reason = "N/A";
    let by = "N/A";
    // Esto remuebe los filtros clasificadores para el ban
    tags.forEach((tag) => {
      if (tag.startsWith("By:")) by = tag.slice(3);
      if (tag.startsWith("Reason:")) reason = tag.slice(7);
    });
    try {
        //Mensaje final en la ventana de desconeccion.
      player.runCommandAsync(
        `kick ${JSON.stringify(
          player.name
        )} §r\n§l§cFUISTE BANNEADO!\n§r\n§eBanned Por:§r ${by}\n§bRazon:§r ${reason}\n§6Si piensas que hubo un error comunicate con los administradores. `
      );
    } catch (error) {
      // Si no podemos botar con  /kick entonces lo despawnearemos
      //    player.triggerEvent("paradox:kick"); *****
    }
  },

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
UUID: (function () {
    const self = { generate: this };
    const lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? "0" : "") + i.toString(16);
    }
    self.generate = function () {
        const d0 = (Math.random() * 0x100000000) >>> 0;
        const d1 = (Math.random() * 0x100000000) >>> 0;
        const d2 = (Math.random() * 0x100000000) >>> 0;
        const d3 = (Math.random() * 0x100000000) >>> 0;
        return (lut[d0 & 0xff] +
            lut[(d0 >> 8) & 0xff] +
            lut[(d0 >> 16) & 0xff] +
            lut[(d0 >> 24) & 0xff] +
            "-" +
            lut[d1 & 0xff] +
            lut[(d1 >> 8) & 0xff] +
            "-" +
            lut[((d1 >> 16) & 0x0f) | 0x40] +
            lut[(d1 >> 24) & 0xff] +
            "-" +
            lut[(d2 & 0x3f) | 0x80] +
            lut[(d2 >> 8) & 0xff] +
            "-" +
            lut[(d2 >> 16) & 0xff] +
            lut[(d2 >> 24) & 0xff] +
            lut[d3 & 0xff] +
            lut[(d3 >> 8) & 0xff] +
            lut[(d3 >> 16) & 0xff] +
            lut[(d3 >> 24) & 0xff]);
    };
    return self;
})(),

/**
 * @name crypto
 * @param {string} lux - Trosos de informacion
 * @param {string} text - String que sera troceado
 */
 crypto: (lux, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + n.toString(16)).substring(-2);
    const applySaltToChar = (code) => textToChars(String(lux)).reduce((a, b) => a ^ b, Number(code));
    return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
},
}