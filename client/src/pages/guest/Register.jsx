import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../utils/magic";
import { FormError, RedAsterisk } from "../../components";
import { AxiosInstance } from "../../configs";
import { toastSuccess } from "../../utils/toastify";
import { emailRegex } from "../../utils/magic";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useAuth } from "../../contexts/auth.context";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await AxiosInstance.get("/api/roles");
        setRoles(response.data.data);
      } catch (error) {}
    };
    fetchRoles();
  }, []);

  const validateField = useCallback((name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required";
        break;
      case "username":
        if (!value) error = "Username is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8 || value.length > 24)
          error = "Password must be 8-24 characters long";
        break;
      case "role":
        if (!value) error = "Role is required";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      validateField(name, value);
    },
    [validateField]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) isValid = false;
    });
    return isValid;
  }, [formData, errors, validateField]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      try {
        const response = await register(formData);
        toastSuccess(response.data.message);
        navigate(paths.homepage.url);
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
            Create an account
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name <RedAsterisk />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-600" : "border-gray-300"
                  } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <FormError message={errors.name} />}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username <RedAsterisk />
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`bg-gray-50 border ${
                  errors.username ? "border-red-600" : "border-gray-300"
                } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                placeholder="Your username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <FormError message={errors.username} />}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email <RedAsterisk />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`bg-gray-50 border ${
                  errors.email ? "border-red-600" : "border-gray-300"
                } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <FormError message={errors.email} />}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password <RedAsterisk />
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

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Register as <RedAsterisk />
              </label>
              <select
                name="role"
                id="role"
                className={`bg-gray-50 border ${
                  errors.role ? "border-red-600" : "border-gray-300"
                } text-gray-900 rounded-lg focus:border-primary block w-full p-2.5`}
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {capitalizeFirstLetter(role.name)}
                  </option>
                ))}
              </select>
              {errors.role && <FormError message={errors.role} />}
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
                "Sign up"
              )}
            </button>

            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary hover:underline"
                to={paths.login.url}
              >
                {paths.login.name}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
