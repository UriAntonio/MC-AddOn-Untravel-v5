import Config from "../../conf/Configuration";
import Server from "../../server";
import { Database } from "../DataBase/Database";
import { checkObjective } from "../Server/Scoreboard";


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
        // await Server.waitLoaded()
        this.MoneyDatabase = new Database("moneyDB")
        if (!checkObjective(MoneyObjective)) await Server.world.scoreboard.addObjective(MoneyObjective, MoneyObjective)
        this.#isLoaded = true
        this.#Readyplayer = []

        Server.world.afterEvents.playerSpawn.subscribe(async (data) => {
            let player = data.player
            if (data.initialSpawn) {
                let playerMoney = this.MoneyDatabase.get(player.name)
                if (playerMoney == undefined) playerMoney = this.getMoney(player.name)
                if (playerMoney == undefined) playerMoney = this.getStarterMoney()
                this.setMoney(player.name, playerMoney)
                this.#Readyplayer.push(player.name)
            }
        })

        Server.world.afterEvents.worldInitialize.subscribe( async (data) =>{
            Server.world.getAllPlayers().forEach(player => this.#Readyplayer.push(player.name))
        })

        Server.world.afterEvents.playerLeave.subscribe( async (data) => 
            this.#Readyplayer.splice(this.#Readyplayer.findIndex(i => i == data.playerName), 1)
        )

        Server.System.runInterval(() => {
            Server.world.getAllPlayers().forEach(player => {
                if (!player.isValid()) return
                if (!this.#Readyplayer.find(p => p == player.name)) return
                let money = this.getMoney(player.name)
                this.MoneyDatabase.set(player.name, money)
            })
        })
    }

    /**
     * Obten el Dinero de Inicio
     * @returns {nomber}
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
     * Obten el Dinero del Jugadore
     * @param {string} playerName
     * @param {number}
     */
    getMoney(playerName) {
        let player = Server.getPlayer(playerName)
        let playerMoney
        if (player != undefined) {
            playerMoney = player.getScore(MoneyObjective)
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
        let player = Server.getPlayer(playerName)
        if (player != undefined) {
            player.setScore(MoneyObjective, money)
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
      }
}

const Money = new MoneySystem()

export default Money