const model = require('../models/inventory-model');

async function test() {
  try {
    const vehicle = await model.getVehicleById(1);
    console.log('RESULTADO VEHÍCULO:', vehicle);
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
}

test();
