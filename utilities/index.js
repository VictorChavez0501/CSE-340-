// utilities/index.js

// ============================
// Formateo de moneda
// ============================
function formatCurrency(amount) {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(amount));
}

// ============================
// Formateo de números
// ============================
function formatNumber(number) {
  if (number == null) return '';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(number));
}

// ============================
// Sanitizar texto simple (sin HTML)
// ============================
function sanitizeText(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ============================
// Construir HTML para detalle de vehículo
// ============================
function buildVehicleDetailHTML(vehicle) {
  if (!vehicle) return '';

  const price = formatCurrency(vehicle.inv_price);
  const miles = formatNumber(vehicle.inv_miles);
  const imageUrl = vehicle.inv_image || vehicle.inv_thumbnail || '/images/placeholder.png';
  const description = sanitizeText(vehicle.inv_description);

  return `
    <div class="vehicle-detail">

      <div class="vehicle-image-wrapper">
        <img src="${imageUrl}" 
             alt="${sanitizeText(vehicle.inv_make)} ${sanitizeText(vehicle.inv_model)}"
             class="vehicle-full-img" />
      </div>

      <div class="vehicle-info">
        <h1 class="vehicle-title">
          ${sanitizeText(vehicle.inv_year)} 
          ${sanitizeText(vehicle.inv_make)} 
          ${sanitizeText(vehicle.inv_model)}
        </h1>

        <p class="vehicle-price">${price}</p>

        <ul class="vehicle-specs">
          <li><strong>Mileage:</strong> ${miles} miles</li>
          <li><strong>Color:</strong> ${sanitizeText(vehicle.inv_color)}</li>
          <li><strong>Classification:</strong> ${sanitizeText(String(vehicle.classification_id))}</li>
        </ul>

        <div class="vehicle-description">
          <h2>Description</h2>
          <p>${description}</p>
        </div>

        <div class="vehicle-extra">
          <div><strong>Stock ID:</strong> ${vehicle.inv_id}</div>
          <div><strong>Year:</strong> ${vehicle.inv_year}</div>
          <div><strong>Make:</strong> ${sanitizeText(vehicle.inv_make)}</div>
          <div><strong>Model:</strong> ${sanitizeText(vehicle.inv_model)}</div>
          <div><strong>Price:</strong> ${price}</div>
          <div><strong>Miles:</strong> ${miles}</div>
        </div>

      </div>
    </div>
  `;
}

// ============================
// Construir Navbar
// ============================
async function getNav() {
  // Devuelve HTML del navbar, puedes personalizarlo a tu gusto
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/inv">Management</a></li>
    </ul>
  `;
}

// ============================
// Construir select de clasificaciones
// ============================
const inventoryModel = require("../models/inventory-model");

async function buildClassificationList(classification_id = null) {
  const data = await inventoryModel.getClassifications();
  let list =
    '<select name="classification_id" id="classificationList" required>';
  list += '<option value="">Choose a Classification</option>';

  data.forEach((row) => {
    list += `<option value="${row.classification_id}"`;
    if (classification_id == row.classification_id) {
      list += " selected";
    }
    list += `>${row.classification_name}</option>`;
  });

  list += "</select>";
  return list;
}

const bcrypt = require("bcryptjs");

/* ================================
 * Compare plain password with hashed password
 * ================================ */
async function comparePassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    return false;
  }
}

/* ================================
 * Hash password
 * ================================ */
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

// ============================
// Exportar funciones
// ============================
module.exports = {
  formatCurrency,
  formatNumber,
  buildVehicleDetailHTML,
  getNav,
  buildClassificationList,
  comparePassword,
  hashPassword
};
