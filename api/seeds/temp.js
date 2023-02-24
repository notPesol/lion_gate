const bcrypt = require('bcrypt');

const genHash = async (value) => {
  try {
    const hash = await bcrypt.hash(value, 10);
    return hash;
  } catch (error) {
    console.log(error);
  }
}