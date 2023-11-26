import Server from "../../server"

let LogData = []
const SystemLog = (log) => {
  LogData.push("[System] " + log)
  console.log(`[System]  ${log}`)
  //need tu add a inside log system in server
  return Server.sendMsgAll(`@a[tag="Notify"]`, `§8[System] ${log}`)
}

const Log = (log) => {
  LogData.push("[Notify] "+log)
  Server.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]${log}`)
  console.log(`[Notify]: ${log}`)
}

const LogWarn = (log) => {
  LogData.push("§c"+log)
  console.warn(`${log}`)
  Server.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]§4${log}`)
}
/**const ClearLog = () => {
  LogData = []
}*/

export { SystemLog, Log, LogData, LogWarn,/**ClearLog*/ }