const PDFDocument = require("pdfkit");

const db = require("../config/db");

exports.generatePDF = (req, res) => {

  const noteId =
    req.params.id;

  db.get(
    `
    SELECT * FROM notes
    WHERE id = ?
    `,
    [noteId],
    (err, note) => {

      if (err || !note) {

        return res
          .status(404)
          .json({
            error: "Nota não encontrada"
          });

      }

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${note.title}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(24)
        .text(
          note.title,
          {
            align: "center"
          }
        );

      doc.moveDown();

      doc
        .fontSize(14)
        .text(note.content);

      doc.end();

      console.log(
        `PDF gerado da nota ID: ${noteId}`
      );

    }
  );

};