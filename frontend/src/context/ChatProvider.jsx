import { createContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null);
    
    
  }, [fetchAgain]);

  const fetchChats = async () => {
    await axios
      .get("/api/v1/chats")
      .then((res) => {
        setChats(res.data);
        console.table(res.data);
      })
      .catch((err) => {
        if (toaster.isVisible("toast")) {
          return toaster.dismiss();
        }
        toaster.create({
          id: "toast",
          title: err.response.data.message,
          type: "warning",
        });
      })
      .finally(() => setLoading(false));
  };


  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchAgain,
        setFetchAgain,
        notifications,
        setNotifications,
        search,
        setSearch,
        deleteMode,
        setDeleteMode,
        fetchChats,
        loading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


export default ChatProvider;
