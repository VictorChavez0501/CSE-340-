const invModel = require("../models/inventory-model");

// Navigation (you probably already have this)
async function getNav() {
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/inv/type/1">Sedan</a></li>
      <li><a href="/inv/type/2">SUV</a></li>
      <li><a href="/inv/type/3">Truck</a></li>
    </ul>
  `;
}

// Vehicle grid for classification
function buildClassificationGrid(data) {
  let grid = '<div class="grid">';
  data.forEach(vehicle => {
    grid += `
      <a href="/inv/detail/${vehicle.inv_id}">
        <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
        <h3>${vehicle.inv_make} ${vehicle.inv_model}</h3>
      </a>
    `;
  });
  grid += "</div>";
  return grid;
}

// Vehicle detail HTML
function buildDetailHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <div>
        <h2>${vehicle.inv_make} ${vehicle.inv_model} (${vehicle.inv_year})</h2>
        <p><strong>Price:</strong> $${vehicle.inv_price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()} miles</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

module.exports = { getNav, buildClassificationGrid, buildDetailHTML };
