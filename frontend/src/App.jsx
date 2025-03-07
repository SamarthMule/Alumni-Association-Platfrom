import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentProfile from "./pages/Student/StudentProfile";
import Home from "./pages/Home/Home";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AlumniDashboard from "./pages/Alumni/AlumniDashboard";
import AlumniNetwork from "./pages/Alumni/AlumniNetwork";
import StudentNetwork from "./pages/Student/StudentNetwork";
import AlumniProfile from "./pages/Alumni/AlumniProfile";
import AlumniJobs from "./pages/Alumni/AlumniJob";
import StudentLayout from "./components/Student/StudentLayout";
import AlumniLayout from "./components/Alumni/AlumniLayout";
import AConnect from "./pages/Alumni/AConnect";
import HomeLayout from "./components/Home/HomeLayout";
import StudentJob from "./pages/Student/StudentJob";
import StudentEvents from "./pages/Student/StudentEvents";
import LoginPage from "./pages/Home/Auth/LoginPage";
import RegisterPage from "./pages/Home/Auth/RegisterPage";
import MentorConnect from "./pages/Student/MentorConnect";
import EventLayout from "./components/Event/EventLayout";
import AllEvents from "./components/Event/AllEvents";
import CreateEvent from "./components/Event/CreateEvent";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageJobs from "./components/Admin/ManageJobs";
import ManageEvents from "./components/Admin/ManageEvents";
// import Reports from "./components/Admin/";
// import Notifications from "./pages/Admin/Notifications";

import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "student",
    element: <StudentLayout />,
    children: [
      { path: "profile", element: <StudentProfile /> },
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "network", element: <StudentNetwork /> },
      { path: "mentor-connect", element: <MentorConnect /> },
      { path: "jobs", element: <StudentJob /> },
      { path: "events", element: <StudentEvents /> },
    ],
  },
  {
    path: "alumni",
    element: <AlumniLayout />,
    children: [
      { path: "dashboard", element: <AlumniDashboard /> },
      { path: "network", element: <AlumniNetwork /> },
      { path: "profile", element: <AlumniProfile /> },
      { path: "jobs", element: <AlumniJobs /> },
      { path: "mentor-connect", element: <AConnect /> },
    ],
  },
  {
    path: "event",
    element: <EventLayout />,
    children: [
      {
        index: true,
        element: <AllEvents />,
      },
      {
        path: "create",
        element: <CreateEvent />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "jobs", element: <ManageJobs /> },
      { path: "events", element: <ManageEvents /> },
      // { path: "reports", element: <Reports /> },
      // { path: "notifications", element: <Notifications /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
