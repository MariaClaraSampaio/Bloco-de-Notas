const express = require("express");

const router = express.Router();

const notes =
  require("../controllers/notesController");

router.post(
  "/",
  notes.createNote
);

router.get(
  "/single/:id",
  notes.getSingleNote
);

router.get(
  "/:userId",
  notes.getNotes
);

router.delete(
  "/:id",
  notes.deleteNote
);

module.exports = router;