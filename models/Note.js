const mongoose = require("../db/connections");
const Schema = mongoose.Schema;

const Note = new Schema({
  note: String
});

module.exports = mongoose.model("Note", Note);
