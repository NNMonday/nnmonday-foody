import React, { useEffect } from "react";
import { LoadingIndicator } from "../../components";
import { useAuth } from "../../contexts/auth.context";
import { toastSuccess } from "../../utils/toastify";

export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    (async () => {
      const res = await logout();
      toastSuccess(res.data.message);
    })();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingIndicator />
    </div>
  );
}
