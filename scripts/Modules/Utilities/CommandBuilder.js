import * as mc from "@minecraft/server";
import PlayerClass from "../PlayerClass";

let registerInformation = {
    name: "",
    aliases: [""],
    description: "",
    category: "",
    usage: "",
    admin: true || false,
    settingname: ""
}

export class CommandBuilder {
  constructor() {
    this._registrationInformation = [];
  }
    /**
   * Registra un comando con una llamada de vuelta
   * @param {registerInformation} add Un  objeto de informacion necesaria para registrar el comando personalizado
   * @param {(data: mc.ChatSendBeforeEvent, player: PlayerClass, args: Array<string>) => void} callback Codigo que tu quieres ejecutar cuando el comando sea ejecutado
   * @example import { Untravel } from "../../Minecraft";
   *  Untravel.cmd.register({ name: 'ping' }, (data, args) => {
   *  Untravel.broadcast('Pong!', data.sender.name);
   * });
   * 
   * Asegurate de agregar el comando a Config y que el nombre sea igual al archivo
   */
    add(add, callback) {
      let form = {
        name: add.name.toLowerCase(),
        aliases: add.aliases
          ? add.aliases.map((v) => v.toLowerCase())
          : null,
        description: add.description,
        category: add.category || "None",
        usage: add.usage,
        admin: add.admin || false,
        settingname: add.settingname || add.name.toLowerCase(),
        callback,
      };
      this._registrationInformation.push(form)
    }
    /**
    * Obten una lista de comandos registrados
    * @returns {Array<string>}
    * @example get();
    */
    get() {
        const commands = [];
        this._registrationInformation.forEach((element) => {
            if (element.private) return;
            commands.push(element.name);
        });
        return commands;
    }
    /**
   * Obten toda la informacion registrada
   * @returns {Array<storedRegisterInformation>}
   * @example getAllRegistration();
   */
    getAllRegistation() {
        return this._registrationInformation;
    }
    /**
   * Obeten la informacion registrada sobre un comando en especifico
   * @param name El nombre del comando o alias del que tu quieres obtener informacion
   * @returns {storedRegisterInformation}
   * @example getRegistration('lobby');
   */
    getRegistration(name) {
      const command = this._registrationInformation.some(
        (element) =>
          element.name.toLowerCase() === name ||
          (element.aliases && element.aliases.includes(name))
      );
      if (!command) return;
      let register;
      this._registrationInformation.forEach((element) => {
        if (element.private) return;
        const eachCommand =
          element.name.toLowerCase() === name ||
          (element.aliases && element.aliases.includes(name));
        if (!eachCommand) return;
        register = element;
      });
      return register;
    }
}

export default new CommandBuilder();