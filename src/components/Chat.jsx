import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios"

const Chat = () => {

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const { targetUserId } = useParams();
    const user = useSelector(store => store.user);
    const userId = user?._id;

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnnection();
        socket.emit("joinChat", {
            firstName: user.firstName, userId, targetUserId
        });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName + ":" + text)
            setMessages((messages) => [...messages, { firstName, lastName, text }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage
        })
        setNewMessage("")
    }

    const fetchMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId.firstName,
                lastName: senderId.lastName,
                text
            }
        })
        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="bg-[#0f172a] flex justify-center items-center px-4 py-6 ">

            {/* Chat Container */}
            <div className="w-[600px] h-[70vh] bg-[#111827] rounded-2xl shadow-lg flex flex-col border border-gray-700">

                {/* Header */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="user"
                            className="w-8 h-8 rounded-full object-cover border border-gray-600"
                        />
                        <span className="text-gray-300 text-lg">User</span>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg, index) => {
                        return <div key={index}>
                           <div className={"chat " + (user.firstName === msg.firstName ? "chat-start" : "chat-end")}>
                                <div className="chat-header">
                                    {msg.firstName + " " + msg.lastName}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </div>
                    })}
                </div>

                {/* Input Section */}
                <div className="p-3 border-t border-gray-700 flex items-center gap-2">

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-[#1f2937] text-white px-4 py-2 rounded-lg outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg "
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

