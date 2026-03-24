import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const context = useAuth();
  const { user, loading } = context;

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
