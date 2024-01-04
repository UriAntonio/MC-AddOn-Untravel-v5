
/**
 * @author KlarixMx and Corrected by THE BOSS9345. This DB Class Use DatabaseDynamicProperty By THE BOSS9345.
 * 
 */
export class DB {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        this.userkey = name;
        if (!Database.has(name)) Database.set(name, "{}");
        this.data = JSON.parse(Database.get(name));
    }

    update() {
        Database.set(this.userkey, JSON.stringify(this.data))
        return true
    }
    /**
     * Add a value in a key inside of DB
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        this.data[key] = value
        this.update();
    }

    /**
     * Get de value stored in the Key
     * @param {string} key 
     * @returns {Object} { value }
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Delet the key and value stored in
     * @param {string} key 
     */
    delete(key) {
        delete this.data[key];
        this.update();
    }

    /**
     * Verify if DB has element key
     * 
     * if it has return True else return False
     * @param {string} key 
     * @returns  boolean
     */
    has(key) {
        if (!this.data[key]) return false
        return true
    }
    /**
     * 
     * @returns object
     */
    entries() {
        return Object.entries(this.data);
    }
    getAll() {
        return this.data;
    }

    /**
     * A function that be executed in eache key of the DB usinf Kay and value as param
     * @param {Function} callback 
     */
    forEach(callback) {
        for (const [key, value] of Object.entries(this.data)) {
            callback(key, value)
        }
    }
    /**
     * get an Array of all the keys in the DB
     * @returns Array[]
     */
    keys() {
        let keys = []
        for (const [key, value] of Object.entries(this.data)) keys.push(key)
        return keys;
    }
    /**
     * Get an Array of all values in the DB
     * @returns Array[]
     */
    values() {
        let values = []
        for (const [key, value] of Object.entries(this.data)) values.push(value)
        return values;
    }
    /**
     * Get the total lenght of a DB
     * @returns number
     */
    get lenght() {
        return Object.entries(this.data).length
    }
    /**
     * Dangerous, Reset all the data (Eliminar)
     * 
     */
    get reset() {
        this.data = {};
    }
}