const bcrypt = require("bcryptjs")

async function hashPassword() {
  const hash = await bcrypt.hash("Client123!", 10)
  console.log(hash)
}

hashPassword()
