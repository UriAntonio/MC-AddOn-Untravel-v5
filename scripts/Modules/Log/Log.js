import Untravel from "../../Untravel"

let LogData = []
const SystemLog = (log) => {
  LogData.push("[System] " + log)
  console.log(`[System]  ${log}`)
  //need tu add a inside log system in Untravel
  return Untravel.sendMsgAll(`@a[tag="Notify"]`, `§8[System] ${log}`)
}

const Log = (log) => {
  LogData.push("[Notify] "+log)
  Untravel.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]${log}`)
  console.log(`[Notify]: ${log}`)
}

const LogWarn = (log) => {
  LogData.push("§c"+log)
  console.warn(`${log}`)
  Untravel.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]§4${log}`)
}
/**const ClearLog = () => {
  LogData = []
}*/

export { SystemLog, Log, LogData, LogWarn,/**ClearLog*/ }