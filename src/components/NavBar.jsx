import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const NavBar = () => {
  const user  = useSelector(store => store.user)

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
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default NavBar