import { Car } from "./../src/entities/car.js";
import { CarCategory } from "./../src/entities/carCategory.js";
import { Customer } from "./../src/entities/customer.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import faker from "faker";
import { writeFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const seederBaseFolder = join(__dirname, "../", "database");

const ITEMS_AMONUT = 2;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMONUT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 }),
  });
  customers.push(customer);
}

const write = (fileName, data) =>
  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data, null, 2));

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategories.json", [carCategory]);

  console.log("cars", cars);
  console.log("carCategory", carCategory);
  console.log("customers", customers);
})();
