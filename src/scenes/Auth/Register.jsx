import React, { useState } from "react";
import ApiService from "../../Api/ApiService";
import Swal from "sweetalert2";

const Register = () => {

  const api = new ApiService();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mobile: "",
    role: "ROLE_CUSTOMER",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    mobile: "",
    role: "",
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!phonePattern.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
      valid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);

        try {
          const response=  await api.post("/api/auth/register", formData);
          if (response.jwt!=null) {
            localStorage.setItem('token', response.jwt);
            // Success response
            Swal.fire({
              title: 'Success!',
              text: 'You have signed up successfully!',
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
        mobile: "",
        role: "customer",
      });
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
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

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.mobile ? "focus:ring-red-400 border-red-400" : "focus:ring-blue-400"
              }`}
              required
              placeholder="Enter your mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.role ? "focus:ring-red-400 border-red-400" : "focus:ring-blue-400"
              }`}
              required
            >
              <option selected value="ROLE_CUSTOMER">Customer</option>
              <option value="ROLE_MANAGER">Manager</option>
             
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
