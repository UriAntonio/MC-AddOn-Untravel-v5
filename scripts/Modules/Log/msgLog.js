//import Server from "../../server"

let LogDataMsg = []
const SystemLogMsg = (log) => {
  LogDataMsg.push("[SystemMsg] " + log)
  //console.log(`[System]  ${log}`)
  //need tu add a inside log system in server
  return //Server.sendMsgAll(`@a[tag="Notify"]`, `§8[System] ${log}`)
}

const msgLog = (log) => {
  LogDataMsg.push("[Msg] "+log)
  //Server.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]${log}`)
  //console.log(`[Notify]: ${log}`)
}

const msgLogWarn = (log) => {
  LogDataMsg.push("§c"+log)
  console.warn(`${log}`)
  //Server.sendMsgAll(`@a[tag="Notify"]`, `§8[§c!§8]§4${log}`)
}
/**const ClearLog = () => {
  LogData = []
}*/

export { SystemLogMsg, msgLog, LogDataMsg, msgLogWarn,/**ClearLog*/ }