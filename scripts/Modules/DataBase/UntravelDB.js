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
        this.data = Database.get(name);
    }

    set(key, value) {
        this.data[key] = value;
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