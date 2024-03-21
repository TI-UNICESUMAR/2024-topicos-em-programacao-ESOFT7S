import { Base } from "./base/base.js";

export class CarCategory extends Base {
    constructor({ id, name, carIds, price }) {
        super({ id, name })

        this.carIds = carIds
        this.price = price
    }
}