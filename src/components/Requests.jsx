import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <h1 className="text-3xl font-bold text-center">
          No Requests found
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-base-100">

      <div className="flex-grow px-6 py-10 pb-24">

        <h1 className="text-3xl font-bold mb-10 text-center">
          Requests
        </h1>

        <div className="max-w-3xl mx-auto space-y-6">
          {requests.map((requests) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
            } = requests.fromUserId;

            return (
              <div
                key={_id}
                className="flex items-center bg-base-200 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={
                    photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  className="w-20 h-20 rounded-xl object-cover mr-6 border border-base-300"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-sm text-gray-400">
                    Age: {age || "N/A"} • {gender || "N/A"}
                  </p>

                  <p className="mt-2 pr-3 text-sm">
                    {about || "No description available"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    className="bg-green-400 font-bold text-l rounded-lg px-4 py-2 shadow-md"
                    onClick={() =>
                      reviewRequest("accepted", requests._id)
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="bg-red-400 text-l font-bold rounded-lg px-4 py-2 shadow-md"
                    onClick={() =>
                      reviewRequest("rejected", requests._id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <div className="h-16 bg-gradient-to-t from-base-100 to-transparent"></div>

    </div>
  );
};

export default Requests;