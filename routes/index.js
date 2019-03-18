const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");
const tasksController = require("../controllers/tasksController");
const NoteController = require("../controllers/NoteController")

router.get("/api/projects", ProjectController.index);
router.post("/api/projects/", ProjectController.create);
router.get("/api/projects/:projectId", ProjectController.show);
router.patch("/api/projects/:projectId", ProjectController.update);
router.delete("/api/projects/:projectId", ProjectController.delete);

router.get("/api/projects/:projectId/tasks", tasksController.index);
router.get("/api/tasks/:taskId", tasksController.show);
router.delete("/api/projects/:projectId/tasks/:taskId", tasksController.delete);
router.patch("/api/tasks/:taskId", tasksController.update);
router.post("/api/projects/:projectId/tasks", tasksController.create);

router.get('/api/projects/:projectId/tasks/:taskId/notes', NoteController.index)
router.post('/api/projects/:projectId/tasks/:taskId/notes', NoteController.create)
router.get('/api/projects/:projectId/tasks/:taskId/notes/:noteId', NoteController.show)
router.patch('/api/projects/:projectId/tasks/:taskId/notes/:noteId', NoteController.update)
router.delete('/api/projects/:projectId/tasks/:taskId/notes/:noteId', NoteController.delete)

module.exports = router;
