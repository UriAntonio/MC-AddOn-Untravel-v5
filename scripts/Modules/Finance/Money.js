import { system, world } from "@minecraft/server";
import Config from "../../Commands/Configuration";
import Untravel from "../../Untravel";
import { DB } from "../DataBase/UntravelDB";


const MoneyObjective = "Money"
const MoneyStructure = {
    playerName: String.prototype,
    playerMoney: Number.prototype
}

class MoneySystem {
    #isLoaded; #Readyplayer
    constructor() {
        this.#isLoaded = false
        this.#init()
    }

    async #init() {
        // await Untravel.waitLoaded()
        this.MoneyDatabase = new DB("moneyDB")
        //if (!checkObjective(MoneyObjective)) await world.scoreboard.addObjective(MoneyObjective, MoneyObjective)
        this.#isLoaded = true
        this.#Readyplayer = []

        world.afterEvents.playerSpawn.subscribe(async (data) => {
            let player = data.player
            if (data.initialSpawn) {
                let playerMoney = this.MoneyDatabase.get(player.name)
                if (playerMoney == undefined) {
                    playerMoney = this.getMoney(player.name)
            }
                
                if (playerMoney == undefined) {
                    playerMoney = this.getStarterMoney()
                }
                
                this.setMoney(player.name, playerMoney)
                this.#Readyplayer.push(player.name)
            }
        })

        world.afterEvents.worldInitialize.subscribe( async (data) =>{
            world.getAllPlayers().forEach(player => this.#Readyplayer.push(player.name))
        })

        world.afterEvents.playerLeave.subscribe( async (data) => 
            this.#Readyplayer.splice(this.#Readyplayer.findIndex(i => i == data.playerName), 1)
        )

        system.runInterval(() => {
            world.getAllPlayers().forEach(player => {
                if (!player.isValid()) return
                if (!this.#Readyplayer.find(p => p == player.name)) return
                let money = this.getMoney(player.name)
                this.MoneyDatabase.set(player.name, money)
            })
        })
    }

    /**
     * Obten el Dinero de Inicio
     * @returns {number}
     */
    getStarterMoney() {
        return Untravel.Setting.get("starterMoney") ?? Config.starterMoney
    }

    /**
     * Obten el Maximo de Dinero
     * @returns {number}
     */
    getMaxMoney() {
        return Untravel.Setting.get("maxMoney") ?? Config.maxMoney
    }

    /**
     * Obten el Dinero del Jugador
     * @param {string} playerName
     * @param {number}
     * @param {PlayerClass} player
     */
    getMoney(playerName) {
        let player = Untravel.getPlayer(playerName)
        let playerMoney
        if (player != undefined) {
            playerMoney = this.MoneyDatabase.get(player.name)
        } else {
            playerMoney = this.MoneyDatabase.get(playerName)
        }
        if (playerMoney == undefined) this.setMoney(playerName, this.getStarterMoney())
        return playerMoney ?? this.getStarterMoney()
    }

    /**
     * Asigna el Dinero al Jugador
     * @param {string} playerName
     * @param {number} money
     */
    async setMoney(playerName, money) {
        let player = Untravel.getPlayer(playerName)
        if (player != undefined) {
            this.MoneyDatabase.set(player.name, money)
        } else {
            await this.MoneyDatabase.set(playerName, money)
        }
    }

    /**
     * retorna Toda la Informacion guardada en la Base de datos Money
     * @returns {MoneyStructure}
     */
    getAllMoney() {
        let Data = []
        this.MoneyDatabase.forEach((key, value) => {
            Data.push({
                playerName: key,
                playerMoney: value
            })
        })
        return Data
    }

    async resetData() {
        await this.MoneyDatabase.clear()
        await world.scoreboard.removeObjective(MoneyObjective)
        await world.scoreboard.addObjective(MoneyObjective, MoneyObjective)
        //await this.FundsDatabase.delete(FundsName)
        //await this.FundsDatabase.set(FundsName, 0)
      }
}

const Money = new MoneySystem()

export default Money