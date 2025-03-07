import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useChatContext from "../../hooks/useChatContext";
import Footer from "../common/Footer";
import { toaster } from "../../components/ui/toaster";

const HomeLayout = () => {
  const { user, setUser } = useChatContext();

  const navigate = useNavigate();

  const navigateUser = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        toaster.create({
          title: "Welcome Admin",
          type: "success",
        });
        break;
      case "alumni":
        navigate("/alumni/profile");
        toaster.create({
          title: "Welcome Alumni",
          type: "success",
        });

        break;

        case "eventmanager":
        navigate("/event/");
        toaster.create({
          title: "Welcome event manager",
          type: "success",
        });
        break;
      case "student":
      case "user":
        navigate("/student/profile");
        toaster.create({
          title: "Welcome Student",
          type: "success",
        });
        break;
      default:
        navigate("/");
    }
  };

  useEffect(() => {
    if (user) {
      navigateUser(user.role);
    }
  }, [user]);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
