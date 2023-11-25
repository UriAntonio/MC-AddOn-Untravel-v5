import { system, world } from "@minecraft/server";
import Config from "../../conf/Configuration";
import { Database } from "../DataBase/Database";
import { checkObjective } from "../Server/Scoreboard";
import Server from "../../server";

const FundsObjective = "Fund"
const FundsStructure = {
    playerName: String.prototype,
    playerMoney: Number.prototype
}

let FundsName = Config.FundsName 

class FundsSystem {
    #isLoaded; #Readyplayer
    constructor() {
        this.#isLoaded = false
        this.#init()
    }

    async #init() {
        // await Server.waitLoaded()
        this.FundsDatabase = new Database("fundsDB")
        if (!checkObjective(FundsObjective)) await world.scoreboard.addObjective(FundsObjective, FundsObjective)
        this.#isLoaded = true
        this.#Readyplayer = []

        world.afterEvents.playerSpawn.subscribe(async (data) => {
            let player = data.player
            if (data.initialSpawn) {
                let playerMoney = this.FundsDatabase.get(FundsName)
                //Server.sendMessage(`${playerMoney} 1`)
                if (playerMoney == undefined) {
                    playerMoney = this.getMoney(FundsName)
                    //    Server.sendMessage(`${playerMoney} 2`)
                }

                if (playerMoney == undefined) {
                    playerMoney = this.getStarterMoney()
                    //    Server.sendMessage(`${playerMoney} 3`)
                }

                this.setMoney(FundsName, playerMoney)
                this.#Readyplayer.push(player.name)
            }
        })

        world.afterEvents.worldInitialize.subscribe(async (data) => {
            world.getAllPlayers().forEach(player => this.#Readyplayer.push(player.name))
        })

        world.afterEvents.playerLeave.subscribe(async (data) =>
            this.#Readyplayer.splice(this.#Readyplayer.findIndex(i => i == data.playerName), 1)
        )

        system.runInterval(() => {
            world.getAllPlayers().forEach(player => {
                if (!player.isValid()) return
                if (!this.#Readyplayer.find(p => p == player.name)) return
                let money = this.getMoney(FundsName)
                this.FundsDatabase.set(FundsName, money)
            })
        })
    }

    /**
     * Obten el Dinero de Inicio
     * @returns {number}
     */
    getStarterMoney() {
        return Server.Setting.get("starterMoney") ?? Config.starterMoney
    }

    /**
     * Obten el Maximo de Dinero
     * @returns {number}
     */
    getMaxMoney() {
        return Server.Setting.get("maxMoney") ?? Config.maxMoney
    }

    /**
     * Obten el Dinero del Fondo
     * @param {string} FundsName
     * @param {number}
     * @param {PlayerClass} player
     */
    getMoney() {
        let playerMoney = this.FundsDatabase.get(FundsName)
        if (playerMoney == undefined) this.setMoney(FundsName, this.getStarterMoney())
        return playerMoney ?? this.getStarterMoney()
    }

    /**
     * Asigna el Dinero al Fondo
     * @param {string} FundsName
     * @param {number} money
     */
    async setMoney(money) {
        await this.FundsDatabase.set(FundsName, money)
    }

    /**
     * retorna Toda la Informacion guardada en la Base de datos Fund
     * @returns {FundsStructure}
     */
    getAllMoney() {
        let Data = []
        this.FundsDatabase.forEach((key, value) => {
            Data.push({
                playerName: key,
                playerMoney: value
            })
        })
        return Data
    }

    async resetData() {
        await this.FundsDatabase.clear()
        await world.scoreboard.removeObjective(FundsObjective)
        await world.scoreboard.addObjective(FundsObjective, FundsObjective)
    }
}

const Fund = new FundsSystem()

export default Fund