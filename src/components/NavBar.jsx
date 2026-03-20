import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const NavBar = () => {
  const user  = useSelector(store => store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async ()=>{
    try{
      await axios.post(BASE_URL + "/logout",{},{withCredentials : true});
      navigate("/login");
      dispatch(removeUser());
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm">
      
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder 🚀</Link>
      </div>

      {user && (
        <div className="flex items-center gap-3 mr-10">

          <p className="text-sm font-medium">
            Hello {user.firstName}{user.lastName} 👋
          </p>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile"
                  src={user.photoUrl}
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default NavBar