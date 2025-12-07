const invModel = require('../models/inventory-model'); // usa path correcto

// Sanitizadores/validadores simples
function sanitizeText(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

function isAlphaNumNoSpace(str) {
  // Solo letras y números, sin espacios ni caracteres especiales
  return /^[A-Za-z0-9]+$/.test(str);
}

async function buildClassificationList(classification_id = null) {
  // invModel.getClassifications must return rows (see model later)
  const data = await invModel.getClassifications();
  let classificationList = '<select name="classification_id" id="classificationList" required>';
  classificationList += '<option value="">Choose a Classification</option>';
  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`;
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += ' selected';
    }
    classificationList += `>${row.classification_name}</option>`;
  });
  classificationList += '</select>';
  return classificationList;
}

module.exports = {
  sanitizeText,
  isAlphaNumNoSpace,
  buildClassificationList,
};

// utilities/index.js
function formatCurrency(amount) {
  if (amount == null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Number(amount));
}

function formatNumber(number) {
  if (number == null) return '';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(number));
}

// Sanitize simple text (no HTML)
function sanitizeText(input) {
  if (!input) return '';
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * buildVehicleDetailHTML(vehicle)
 * Devuelve string HTML (seguro) con la información del vehículo.
 */
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

module.exports = {
  formatCurrency,
  formatNumber,
  buildVehicleDetailHTML,
};
