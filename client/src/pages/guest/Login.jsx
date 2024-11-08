import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../utils/magic";
import { FormError } from "../../components";
import { toastSuccess } from "../../utils/toastify";
import { useAuth } from "../../contexts/auth.context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateField = useCallback((name, value) => {
    let error = "";

    if (!value) {
      if (name === "username") error = "Username or email is required";
      if (name === "password") error = "Password is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prevData) => ({
        ...prevData,
        [name]: fieldValue,
      }));

      validateField(name, fieldValue);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) {
        isValid = false;
      }
    });
    return isValid;
  }, [formData, errors, validateField]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      try {
        const response = await login(formData);
        toastSuccess(response.data.message);
        navigate("/");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate, validateForm]
  );

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mt-20">
      <div className="w-full bg-white rounded-lg shadow border-2 max-w-md">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your username or email
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`bg-gray-50 border ${
                  errors.username ? "border-red-600" : "border-gray-300"
                } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                placeholder="name@company.com"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <FormError message={errors.username} />}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${
                  errors.password ? "border-red-600" : "border-gray-300"
                } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <FormError message={errors.password} />}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-3 text-sm text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <Link
                to={paths.forgotPassword.url}
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  Please wait...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Register Link */}
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                to={paths.register.url}
                className="font-medium text-primary hover:underline"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
