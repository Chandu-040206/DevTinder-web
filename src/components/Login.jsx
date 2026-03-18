import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [emailId, setEmailId] = useState("ratan@gmail.com");
  const [password, setPassword] = useState("Ratan@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId, password
      }, { withCredentials: true })
      dispatch(addUser(res.data))
      return navigate("/");
    }
    catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="h-full flex items-center justify-center bg-base-100 mt-10">

      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl border border-base-300">

        <h2 className="text-3xl font-bold text-center mb-6">Login Page</h2>

        {/* Email */}
        <div className="form-control mb-4">
          <label className="label font-medium mb-1">Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral pl-4"
          />
        </div>

        {/* Password */}
        <div className="form-control mb-2">
          <label className="label font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral  pl-4"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <a className="text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        {/* Button */}
        <button className="btn btn-neutral w-full text-base font-semibold"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};


export default Login;
