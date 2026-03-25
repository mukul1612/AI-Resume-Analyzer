const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.services");
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

async function getInterviewReportById(req, res) {
  const { interviewId } = req.params;
  const interviewreport = await interviewReportModel.findById({
    _id: interviewId,
    user: req.user.id,
  });
  if (!interviewreport) {
    return res.status(400).json({ message: "Interview report not found" });
  }
  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewreport,
  });
}

async function getAllinterview(req, res) {
  const interviewReports = await interviewReportModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGaps -preparationPlan",
    );
  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReports,
  });
}

async function generateResume(req, res) {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findById(interviewId);

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`,
  });

  res.send(pdfBuffer);
}

module.exports = {
  genrateInterviewReport,
  getInterviewReportById,
  getAllinterview,
  generateResume,
};
