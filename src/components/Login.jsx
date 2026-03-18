import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [emailId, setEmailId] = useState("ratan@gmail.com");
  const [password, setPassword] = useState("Ratan@123");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage(err?.response?.data || "Something went wrong");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">

      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl border border-base-300">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login Page
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email"
            className="p-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral transition-all duration-200"
          />
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral transition-all duration-200"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-red-500 text-s font-medium">
            {errorMessage}
          </p>
          <a className="text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        <button
          className="btn btn-neutral w-full text-base font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>

  )
}


export default Login;
