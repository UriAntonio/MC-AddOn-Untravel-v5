import { system, world } from "@minecraft/server";
import Config from "../../conf/Configuration";
//import { Database } from "../DataBase/Database";
import { checkObjective } from "../Server/Scoreboard";
import Server from "../../server";
import { LogWarn } from "../Log/Log";


const FundsStructure = {
    fund: String.prototype,
    fundsMoney: Number.prototype
}

const FundsName = Config.FundsName

class FundsSystem {
    #isLoaded; #Readyplayer
    constructor() {
        this.#isLoaded = false
        this.#init()
    }

    async #init() {
        // await Server.waitLoaded()
        //this.FundsDatabase = new Database("fundsDB")
        //if (!checkObjective(FundsName)) await world.scoreboard.addObjective(FundsName, FundsName)
        this.#isLoaded = true
        //this.#Readyplayer = []

        world.afterEvents.playerSpawn.subscribe((data) => {
            //let player = data.player
            if (data.initialSpawn) {
                let fundsMoney //= this.FundsDatabase.get(FundsName)
                //Server.sendMessage(`${fundsMoney} 1`)
                if (fundsMoney == undefined) {
                    fundsMoney = this.getMoney()
                    //    Server.sendMessage(`${fundsMoney} 2`)
                }

                if (fundsMoney == undefined) {
                    fundsMoney = this.getStarterMoney()
                    //    Server.sendMessage(`${fundsMoney} 3`)
                }

                this.setMoney(fundsMoney)
                //this.#Readyplayer.push(player.name)
            }
        })

        world.afterEvents.worldInitialize.subscribe(async (data) => {
            if (Database.has(FundsName) == false) Database.set(FundsName, JSON.stringify({ current: 0 })), LogWarn("base de datos creada")

            world.getAllPlayers().forEach(player => this.#Readyplayer.push(player.name))
        })

        //world.afterEvents.playerLeave.subscribe(async (data) =>
        //this.#Readyplayer.splice(this.#Readyplayer.findIndex(i => i == data.playerName), 1)
        //)

        // system.runInterval(() => {
        //     world.getAllPlayers().forEach(player => {
        //         if (!player.isValid()) return
        //         if (!this.#Readyplayer.find(p => p == player.name)) return
        //         let money = this.getMoney(FundsName)
        //         this.FundsDatabase.set(FundsName, money)
        //     })
        // })
    }

    /**
     * Obten el Dinero de Inicio
     * @returns {number}
     */
    getStarterMoney() {
        return Config.starterMoney
    }

    /**
     * Obten el Maximo de Dinero
     * @returns {number}
     */
    getMaxMoney() {
        return Config.maxMoney
    }

    /**
     * Obten el Dinero del Fondo
     * @param {string} FundsName
     * @returns {number}
     */
    getMoney() {
        let FundsValue = Database.get(FundsName)
        let fundsObject = JSON.parse(FundsValue)
        let fundsMoney = fundsObject.current
        //LogWarn(`${FundsValue},${fundsMoney}`)
        if (fundsMoney == undefined || fundsMoney == null) Database.set(FundsName, JSON.stringify({ current: Number(this.getStarterMoney()) }))

        //LogWarn(`${FundsValue},${fundsMoney}`)
        return fundsMoney ?? this.getStarterMoney()
    }

    /**
     * Asigna el Dinero al Fondo
     *
     * @param {number} money
     */
    setMoney(money) {
        try {
            Database.set(FundsName, JSON.stringify({ current: Number(money) }))
        } catch (error) {
            LogWarn(`${error}`)
        }
    }

    /**
     * retorna Toda la Informacion guardada en la Base de datos Fund
     * @returns {FundsStructure}
     */
    getAllMoney() {
        let Data = []
        let FundsValue = Database.get(FundsName)
        let fundsMoney = JSON.parse(FundsValue)
        let numberFunds = fundsMoney.current
        Data.push({
            fund: FundsName,
            fundsMoney: numberFunds
        })
        //Server.sendMessage(`${JSON.stringify(Data)}`)
        return Data
    }

    async resetData() {
        await Database.delete(FundsName)
        await world.scoreboard.removeObjective(FundsName)
        //await world.scoreboard.addObjective(FundsName, FundsName)
    }
}

const Fund = new FundsSystem()

export default Fund