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

    /**
     * Set a value in a key inside of DB
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        this.data[key] = value
        Database.set(this.userkey, JSON.stringify(this.data));
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
        Database.set(this.userkey, JSON.stringify(this.data));
    }

    /**
     * Verify if DB has element key
     * @param {string} key 
     * @returns  boolean
     */
    has(key) {
        if (!this.data[key]) return false
        return true
    }
    static entries() {
        return this.data;
    }
}