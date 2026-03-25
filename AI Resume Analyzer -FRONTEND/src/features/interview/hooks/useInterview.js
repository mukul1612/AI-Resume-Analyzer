import {
  getAllinterview,
  generateInterviewReport,
  getInterviewReport,
} from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";
import { useEffect } from "react";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within a InterviewProvide");
  }

  const { loading, setLoading, report, setReport, allReports, setAllReports } =
    context;

  const genrateReport = async ({
    jobDescription,
    resumeFile,
    selfDescription,
  }) => {
    let response = null;
    try {
      setLoading(true);
      response = await generateInterviewReport({
        jobDescription,
        resumeFile,
        selfDescription,
      });
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getReportById = async (interviewId) => {
    let response = null;
    try {
      setLoading(true);
      response = await getInterviewReport(interviewId);
      setReport(response.interviewreport);
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
    return response.interviewreport;
  };

  const getAllReports = async () => {
    let response = null;
    try {
      setLoading(true);
      response = await getAllinterview();
      setAllReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReports;
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getAllReports();
    }
  }, [interviewId]);
  return {
    genrateReport,
    getReportById,
    getAllReports,
    loading,
    report,
    allReports,
    setLoading,
    setReport,
    setAllReports,
  };
};
