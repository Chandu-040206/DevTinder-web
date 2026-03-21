import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

    const dispatch = useDispatch();

    const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
                withCredentials: true
            });
            dispatch(removeUserFromFeed(userId));
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex items-center min-h-[70vh]">

            <div className="w-80 bg-base-200 rounded-2xl shadow-lg p-6 text-left">

                <div className="flex justify-center mb-4">
                    <img
                        src={photoUrl}
                        alt="profile"
                        className="w-28 h-28 object-cover rounded-lg"
                    />
                </div>

                <h2 className="text-lg font-semibold text-white mb-2">
                    {firstName + " " + lastName}
                </h2>

                <p className="text-sm text-gray-400">Age : {age}</p>
                <p className="text-sm text-gray-400">Gender : {gender}</p>

                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                    {about}
                </p>

                <div className="flex justify-center gap-8 mt-5">

                    <button className="px-4 py-1.5 text-sm font-medium rounded-md border border-blue-500 text-blue-400 
                        hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out"
                        onClick={() => handleSendRequest("interested", _id)}    >
                        Interested
                    </button>

                    <button className="px-4 py-1.5 text-sm font-medium rounded-md border border-blue-500 text-blue-400 
                                hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out"
                        onClick={() => handleSendRequest("ignored", _id)} >
                        Ignored
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
