export class FactBase {
    constructor() {
        this.facts = {};
    }
    setFact(key, value) {
        this.facts[key] = value;
    }
    getFact(key) {
        return this.facts[key];
    }
    getAllFacts() {
        return this.facts;
    }
}
