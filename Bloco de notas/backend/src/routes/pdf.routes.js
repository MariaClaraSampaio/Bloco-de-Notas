const express = require("express");

const router = express.Router();

const pdf =
  require("../controllers/pdfController");

router.get(
  "/:id",
  pdf.generatePDF
);

module.exports = router;