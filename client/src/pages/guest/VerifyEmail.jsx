import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingIndicator } from "../../components";
import { toastSuccess } from "../../utils/toastify";
import { AxiosInstance } from "../../configs";
import { paths } from "../../utils/magic";

export default function VerifyEmail() {
  const { verificationCode } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosInstance.post(
          `/api/auth/verify/${verificationCode}`
        );
        toastSuccess(res.data.message);
        navigate(paths.login.url);
      } catch (error) {
        navigate(paths.homepage.url);
      }
    })();
  }, [navigate, verificationCode]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingIndicator />
    </div>
  );
}
