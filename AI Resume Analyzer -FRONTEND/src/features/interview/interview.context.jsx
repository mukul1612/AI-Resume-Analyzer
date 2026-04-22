import { createContext, useEffect, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvide = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [allReports, setAllReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        report,
        setReport,
        allReports,
        setAllReports,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
