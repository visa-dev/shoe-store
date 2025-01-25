import { Api } from "@mui/icons-material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ApiService from "../../Api/ApiService";

const Login = () => {
const api = new ApiService();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit =async(e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
       try {
      const response=  await api.post("/api/auth/login", formData);
      console.log(response);
      if (response.jwt!=null) {
        localStorage.setItem('token', response.jwt);
        localStorage.setItem("username",response.username);
        localStorage.setItem("role",response.role);
        
        Swal.fire({
          title: 'Success!',
          text: 'Login successfully !',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
         
          window.location.href = '/dashboard';
        });
      } else {
       
        Swal.fire({
          title: 'Error!',
          text: response.data.message || 'Something went wrong. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    }catch (error) {
     console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Network error. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "focus:ring-red-400 border-red-400" : "focus:ring-blue-400"
              }`}
              required
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400 border-red-400" : "focus:ring-blue-400"
              }`}
              required
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
