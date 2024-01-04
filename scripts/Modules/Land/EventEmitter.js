import { system, world } from "@minecraft/server"

const EventEmitter = {}
const listeners = {}

/**
 * Listen on events
 * @param {string} event 
 * @param {(data: {}) => void} callback 
 */
EventEmitter.on = (event, callback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
  return { event, callback };
}

/**
 * Emit a event
 * @param {string} event 
 * @param {{}} data 
 */
EventEmitter.emit = (event, data = {}) => {
  world.getDimension("overworld").runCommand(`scriptevent event:${event} ${JSON.stringify(data)}`)
}

/**
 * Remove listen
 * @param {{event: string, callback: void}} listener
 */
EventEmitter.removeListener = (listener) => {
  const eventListeners = listeners[listener.event];
  if (eventListeners) {
    const index = eventListeners.indexOf(listener.callback);
    if (index !== -1) {
      eventListeners.splice(index, 1);
    }
  }
}

system.afterEvents.scriptEventReceive.subscribe(data => {
  const { id, message } = data
  if (id.startsWith("event:")) {
    let eventName = id.split(":")[1]
    let data = JSON.parse(message) ?? {}
    const eventListeners = listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }
})

export default EventEmitter