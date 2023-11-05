let LogData = []
const SystemLog = (log) => {
  LogData.push("[System] " + log)
  //need tu add a inside log system in server
  return console.warn("[System] " + log)
}

const Log = (log) => {
  LogData.push(log)
}

const ClearLog = () => {
  LogData = []
}

export { SystemLog, Log, LogData, ClearLog }