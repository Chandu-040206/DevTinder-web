import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getFeed()
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) return <>
    <h1 className="text-3xl font-bold mt-10 text-center">
      No users found!!
    </h1></>

  return feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed
