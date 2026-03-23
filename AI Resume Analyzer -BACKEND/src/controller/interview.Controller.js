const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

async function genrateInterviewReport(req, res) {
  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selefDescription, jobDescription } = req.body;

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription: selefDescription,
    jobDescription,
  });
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription: selefDescription,
    jobDescription: jobDescription,
    ...interviewReportByAI,
  });
  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}
module.exports = { genrateInterviewReport };
