import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGetMe = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        try {
          const response = await getMe({});
          setUser(response.userDetals);
        } catch (err) {
          setError(err);
          localStorage.removeItem("isLoggedIn");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
