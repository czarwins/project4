const Task = require("../models/Task");
const Note = require("../models/Note");

const NoteController = {
  index: (req, res) => {
    let taskId = req.params.taskId;
    Task.findById(taskId)
      .populate("notes")
      .then(task => {
        res.send(task.notes);
      })
      .catch(err => err);
  },
  show: (req, res) => {
    let noteId = req.params.noteId;
    Note.findById(noteId).then(note => {
      res.send(note);
    });
  },
  delete: (req, res) => {
    let noteId = req.params.noteId;
    Note.findByIdAndDelete(noteId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => err);
  },
  update: (req, res) => {
    let noteId = req.params.noteId;
    Note.findByIdAndUpdate(noteId, req.body, { new: true })
      .then(updatedNote => {
        updatedNote.save();
        res.send(updatedNote);
      })
      .catch(err => err);
  },
  create: (req, res) => {
    let taskId = req.params.taskId;
    Task.findById(taskId)
      .then(task => {
        Note.create(req.body).then(newNote => {
          console.log(newNote);
          task.notes.push(newNote);
          task.save();
          res.send(newNote);
          console.log(task);
        });
      })
      .catch(err => err);
  }
};

module.exports = NoteController;
