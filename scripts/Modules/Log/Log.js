import Config from "../../conf/Configuration"
import Server from "../../server"

let LogData = []
const SystemLog = (log) => {
  LogData.push("[System] " + log)
  //need tu add a inside log system in server
  return Server.sendMsgAll(`@a[tag=${Config.AdminTag}]`, `§8[System] ${log}`)
}

const Log = (log) => {
  LogData.push(log)
  Server.sendMsgAll(`@a[tag=${Config.AdminTag}]`, `§8${log}`)
}

/**const ClearLog = () => {
  LogData = []
}*/

export { SystemLog, Log, LogData, /**ClearLog*/ }