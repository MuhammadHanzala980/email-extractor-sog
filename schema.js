// schema.js
require("dotenv").config();
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  firstName: String,
 
});

module.exports = mongoose.model(process.env.SITE_NAME || "test", clientSchema);
