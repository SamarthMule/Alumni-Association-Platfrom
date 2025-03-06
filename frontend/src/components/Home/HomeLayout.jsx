import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useChatContext from "../../hooks/useChatContext";
import Footer from "../common/Footer";

const HomeLayout = () => {
  const { user } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "user":
          navigate("/student/dashboard");
          break;
        case "alumni":
          navigate("/alumni/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/login");
      }
    }
  }, [user]);

  return (
    <>
      <Toaster />
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
