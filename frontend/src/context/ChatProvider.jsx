import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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



  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null);
    
  }, [fetchAgain]);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatProvider;
