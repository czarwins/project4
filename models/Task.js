const mongoose = require("../db/connections");
const Schema = mongoose.Schema;

const Task = new Schema({
  title: String,
  description: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

module.exports = mongoose.model("Task", Task);
