import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUser, setTargetUser] = useState(null);

    const messagesEndRef = useRef(null);

    const { targetUserId } = useParams();

    const user = useSelector((store) => store.user);
    const userId = user?._id;

    // AUTO SCROLL
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // SOCKET CONNECTION
    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnnection();

        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessages((messages) => [
                ...messages,
                { firstName, lastName, text },
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    // SEND MESSAGE
    const sendMessage = () => {
        const socket = createSocketConnnection();

        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });

        setNewMessage("");
    };

    // FETCH OLD MESSAGES
    const fetchMessages = async () => {
        const chat = await axios.get(
            BASE_URL + "/chat/" + targetUserId,
            { withCredentials: true }
        );

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;

            return {
                firstName: senderId.firstName,
                lastName: senderId.lastName,
                text,
            };
        });

        setMessages(chatMessages);
    };

    // FETCH TARGET USER
    const fetchTargetUser = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/" + targetUserId,
                { withCredentials: true }
            );

            setTargetUser(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchTargetUser();
    }, [targetUserId]);

    return (
        <div className="bg-[#0f172a] flex justify-center items-center px-4 py-2">
            <div className="w-full max-w-2xl h-[75vh] bg-[#111827] rounded-2xl shadow-2xl flex flex-col border border-gray-700 overflow-hidden">
                
                {/* HEADER */}
                <div className="px-6 py-3 border-b border-gray-700 flex items-center gap-3 bg-[#111827]">
                    <img
                        src={
                            targetUser?.photoUrl ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />

                    <span className="text-gray-200 text-xl font-semibold">
                        {targetUser
                            ? `${targetUser.firstName} ${targetUser.lastName}`
                            : "Loading..."}
                    </span>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#0b1220]">
                    {messages.map((msg, index) => {
                        const isCurrentUser =
                            user.firstName === msg.firstName;

                        return (
                            <div
                                key={index}
                                className={`flex ${
                                    isCurrentUser
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div className="max-w-[75%]">
                                    <div className="text-xs text-gray-400 mb-1 px-1">
                                        {msg.firstName} {msg.lastName}
                                    </div>

                                    <div
                                        className={`px-4 py-2 rounded-2xl shadow-md text-sm break-words ${
                                            isCurrentUser
                                                ? "bg-blue-600 text-white rounded-br-sm"
                                                : "bg-gray-700 text-gray-100 rounded-bl-sm"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>

                                    <div className="text-[10px] text-gray-500 mt-1 px-1">
                                        Seen
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div ref={messagesEndRef}></div>
                </div>

                {/* INPUT */}
                <div className="p-3 border-t border-gray-700 flex items-center gap-3 bg-[#111827]">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) =>
                            setNewMessage(e.target.value)
                        }
                        placeholder="Type a message..."
                        className="flex-1 bg-[#1f2937] text-white px-4 py-2 rounded-xl outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;