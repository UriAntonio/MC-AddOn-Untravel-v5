import { world } from "@minecraft/server";
import Config from "../../Commands/Configuration";
import { LogWarn } from "../Log/Log";
import { DB } from "../DataBase/UntravelDB";


const FundsStructure = {
    fund: String.prototype,
    fundsMoney: Number.prototype
}

const FundsName = Config.FundsName

class FundSystem {
    #isLoaded;
    constructor() {
        this.#isLoaded = false
        this.#init()
    }

    async #init() {
        // await Untravel.waitLoaded()
        this.FundsDatabase = new DB("Fund")
        //if (!checkObjective(FundsName)) await world.scoreboard.addObjective(FundsName, FundsName)
        this.#isLoaded = true
        //this.#Readyplayer = []

        world.afterEvents.playerSpawn.subscribe((data) => {
            //let player = data.player
            if (data.initialSpawn) {
                let fundsMoney = this.FundsDatabase.get(FundsName)
                //Untravel.sendMessage(`${fundsMoney} 1`)
                if (fundsMoney == undefined) {
                    fundsMoney = this.getMoney()
                    //    Untravel.sendMessage(`${fundsMoney} 2`)
                }

                if (fundsMoney == undefined) {
                    fundsMoney = this.getStarterMoney()
                    //    Untravel.sendMessage(`${fundsMoney} 3`)
                }

                this.setMoney(fundsMoney)
                //this.#Readyplayer.push(player.name)
            }
        })

        //world.afterEvents.worldInitialize.subscribe(async (data) => {
            //if (Database.has(FundsName) == false) Database.set(FundsName, JSON.stringify({ current: 0 })), LogWarn("Base de datos Fund creada")

            //world.getAllPlayers().forEach(player => this.#Readyplayer.push(player.name))
        //})

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
        let fundsMoney = this.FundsDatabase.get(FundsName)
        
        //LogWarn(`${FundsValue},${fundsMoney}`)
        if (fundsMoney == undefined | null) this.FundsDatabase.set(FundsName, this.getStarterMoney())
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
            this.FundsDatabase.set(FundsName, money)
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
        let FundsValue = this.FundsDatabase.get(FundsName)
        Data.push({
            fund: FundsName,
            fundsMoney: FundsValue
        })
        //Untravel.sendMessage(`${JSON.stringify(Data)}`)
        return Data
    }

    async resetData() {
        await this.FundsDatabase.delete(FundsName)
        //await world.scoreboard.removeObjective(FundsName)
        await this.FundsDatabase.set(FundsName, 0)
        //LogWarn("Base de datos Fund Inicializada")
        //await world.scoreboard.addObjective(FundsName, FundsName)
    }
}

const Fund = new FundSystem()

export default Fund