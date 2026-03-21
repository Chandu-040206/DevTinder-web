import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setErrorMessage("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, age, gender, about, photoUrl
            },
                { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000)
        }
        catch (err) {
            setErrorMessage(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <>
            <div className="min-h-[calc(100vh-80px)] bg-base-100 px-4 pt-6 pb-24">

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    <div className="w-full bg-base-200/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-base-300">

                        <h2 className="text-3xl font-bold text-center mb-6">
                            Edit Profile
                        </h2>

                        {/* First Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-sm opacity-70">First Name</span>
                            </label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter your first name"
                                className="input input-bordered w-full rounded-xl pl-4"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-sm opacity-70">Last Name</span>
                            </label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter your last name"
                                className="input input-bordered w-full rounded-xl pl-4"
                            />
                        </div>

                        {/* Age + Gender */}
                        <div className="grid grid-cols-2 gap-4 mb-4">

                            {/* Age */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm opacity-70">Age</span>
                                </label>
                                <input
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Enter age"
                                    className="input input-bordered w-full rounded-xl pl-4"
                                />
                            </div>

                            {/* Gender */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-sm opacity-70">Gender</span>
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select select-bordered w-full rounded-xl pl-4"
                                >
                                    <option disabled value="">Select gender</option>
                                    <option>male</option>
                                    <option>female</option>
                                </select>
                            </div>

                        </div>

                        {/* About */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-sm opacity-70">About</span>
                            </label>
                            <textarea
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="Tell something about yourself..."
                                className="textarea textarea-bordered w-full rounded-xl pl-4 pt-3 h-24"
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text text-sm opacity-70">Profile Photo URL</span>
                            </label>
                            <input
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="Paste image URL"
                                className="input input-bordered w-full rounded-xl pl-4"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm font-medium mb-4">
                                {errorMessage}
                            </p>
                        )}

                        {/* Button */}
                        <button className="btn btn-primary w-full rounded-xl text-base font-semibold"
                            onClick={saveProfile}>
                            Save Profile
                        </button>

                    </div>
                    <div className="flex justify-center lg:sticky lg:top-24">
                        <UserCard
                            user={{ firstName, lastName, age, gender, about, photoUrl }}
                        />
                    </div>

                </div>
            </div>

            {showToast && <div className="toast toast-top toast-center mt-10">
                <div className="alert alert-success">
                    <span>Profile saved successfully!!</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile
