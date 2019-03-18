const Project = require("../models/Project");
const Task = require("../models/Task");
const Note = require("../models/Note");
const mongoose = require("./connections");

const firstNote = new Note({
  note: "Project Phase One - Complete."
});

const charterNote = new Note({
  note: "Mandatory project meeting Monday."
});

const charter = new Task({
  title: "Project Charter",
  description: "This form outlines the goals for the project.",
  notes: [firstNote, charterNote]
});

const dataPlan = new Task({
  title: "Data Collection Plan",
  description:
    "The plan includes information around where to collect data, how to collect it, when to collect it.",
  notes: []
});

const sixSigma = new Project({
  projectname: "Lean Six Sigma Project",
  description: "A process improvement project to fix broken processes.",
  tasks: [charter, dataPlan]
});

Project.remove({})
  .then(() => Note.remove({}))
  .then(() => Note.insertMany([firstNote, charterNote]))
  .then(() => Task.remove({}))
  .then(() => Task.insertMany([charter, dataPlan]))
  .then(() => sixSigma.save())
  .then(() => console.log("Successful Save"))
  .then(() => mongoose.connection.close())
  .catch(err => err);
