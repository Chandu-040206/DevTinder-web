import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants"

const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true)

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

  const handleSignUp = async ()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{
        withCredentials:true
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
<div className="flex items-center justify-center min-h-[calc(100vh-80px)] pb-16">
      <div className="w-full max-w-md bg-base-200  py-2 px-8 rounded-2xl shadow-xl border border-base-300">

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Login Page" : "Sign Up"}
        </h2>

        {!isLoginForm && <>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">FirstName</span>
          </label>
          <input
            type="email"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your FirstName"
            className="p-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral transition-all duration-200"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">LastName</span>
          </label>
          <input
            type="email"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your LastName"
            className="p-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-neutral transition-all duration-200"
          />
        </div>
        </>}

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
          <a className="text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={()=>setIsLoginForm((value)=>!value)}>
            {isLoginForm ? "Do not have an account? SignUp" : "Already have an acoount? Login"}
          </a>
        </div>

        <button
          className="btn btn-neutral w-full text-base font-semibold rounded-lg hover:scale-[1.02] transition-transform duration-200"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Create Account"}
        </button>

      </div>
    </div>

  )
}


export default Login;
