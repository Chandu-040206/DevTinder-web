import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <h1 className="text-3xl font-bold text-center">
          No Connections found
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-base-100">

      <div className="flex-grow px-6 py-10 pb-24">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Connections
        </h1>

        <div className="max-w-3xl mx-auto space-y-6">
          {connections.map((user) => (
            <div
              key={user._id}
              className="flex items-center bg-base-200 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >

              <img
                src={
                  user.photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-20 h-20 rounded-xl object-cover mr-6 border border-base-300"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-gray-400">
                  Age: {user.age || "N/A"} • {user.gender || "N/A"}
                </p>

                <p className="mt-2 pr-3 text-sm">
                  {user.about || "No description available"}
                </p>
              </div>

              <button className="btn btn-outline btn-primary rounded-lg px-4 hover:scale-105 transition duration-200">
                Message
              </button>

            </div>
          ))}
        </div>

      </div>

      <div className="h-16 bg-gradient-to-t from-base-100 to-transparent"></div>

    </div>
  );
};

export default Connections;