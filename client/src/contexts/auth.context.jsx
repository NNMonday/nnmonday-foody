import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import SpinningPage from "../pages/others/SpinningPage";
import { AxiosInstance } from "../configs";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const register = useCallback(
    async ({ name, username, email, password, role }) => {
      try {
        const res = await AxiosInstance.post("/api/auth/register", {
          name,
          username,
          email,
          password,
          role,
        });
        return res;
      } catch (error) {}
    },
    []
  );

  const login = useCallback(
    async ({ username, password, rememberMe }) => {
      try {
        const res = await AxiosInstance.post("/api/auth/login", {
          username,
          password,
          rememberMe,
        });
        setCurrentUser(res.data.data);
        return res;
      } catch (error) {}
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    try {
      try {
        setIsAuthChecked(false);
        const res = await AxiosInstance.get("/api/auth/logout");
        return res;
      } catch (error) {
      } finally {
        setCurrentUser(null);
        navigate("/");
      }
    } catch (error) {}
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthChecked) {
          const res = await AxiosInstance.get("/api/auth/check-auth");
          setCurrentUser(res.data.data);
        }
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setIsAuthChecked(true);
        setLoading(false);
      }
    };
    checkAuth();
  }, [isAuthChecked, navigate]);

  const value = { currentUser, setCurrentUser, login, logout, register };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <SpinningPage />}
    </AuthContext.Provider>
  );
}
