import { Base } from "./base/base.js";

export class Customer extends Base {
    constructor({ id, name, age }) {
        super({ id, name })

        this.age = age
    }
}