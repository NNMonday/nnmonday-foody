import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { toastError } from "../utils/toastify";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      toastError({
        response: "You need to login to access this page",
        status: 401,
      });
      navigate("/");
    }
  }, [currentUser, navigate]);

  return children;
}
