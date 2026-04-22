import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading, error, setError } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await login({ email, password });

      setUser(response.userDetals);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const response = await register({ username, email, password });
      setUser(response.userDetals);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();
      setUser(null);
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const response = await getMe({});
      setUser(response.userDetals);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      handleGetMe();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
