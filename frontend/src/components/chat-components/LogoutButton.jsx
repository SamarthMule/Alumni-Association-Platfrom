import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useChatContext from "../../hooks/useChatContext";
import { toaster } from "../ui/toaster";
import axios from "axios";


const LogoutButton = () => {
  const { setUser } = useChatContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/v1/users/logout")
      .then((res) => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        toaster.create({
          title: "Logout successful",
          type: "success",
        });
      })
      .catch((err) => {
        navigate("/login");
        toaster({
          title: err.response.data.message,
          type: "error",
        });
      });
  };
  return (
    <Button colorPalette="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
