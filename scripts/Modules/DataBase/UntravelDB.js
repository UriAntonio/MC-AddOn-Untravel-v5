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
     * 
     * @param {string} key 
     * @param {any} value 
     */
    set(key, value) {
        console.log(`key: ${key} | value ${value}`)
        
        this.data[key] = value
        console.log(`${JSON.stringify(this.data)}`);
        Database.set(this.userkey, JSON.stringify(this.data));
    }

    get(key) { 
        return this.data[key];
    }

    delete(key) {
        delete this.data[key];
        Database.set(this.userkey, JSON.stringify(this.data));
    }

    has(key) {
        if(!this.data[key]) return false
        return true
    }
    static entries() {
        return this.data;
    }
}