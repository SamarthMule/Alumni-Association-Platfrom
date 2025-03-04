import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentProfile from "./pages/Student/StudentProfile";
import Home from "./pages/Home";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AlumniDashboard from "./pages/Alumni/AlumniDashboard";
import AlumniNetwork from "./pages/Alumni/AlumniNetwork";
import StudentNetwork from "./pages/Student/StudentNetwork";
import AlumniProfile from "./pages/Alumni/AlumniProfile";
import AlumniJobs from "./pages/Alumni/AlumniJob";
import StudentLayout from "./components/Student/StudentLayout";
import AlumniLayout from "./pages/Alumni/AlumniLayout";
import MentorConnect from "./pages/MentorConnect";
import HomeLayout from "./components/HomeLayout";
import StudentJob from "./pages/Student/StudentJob";
import StudentEvents from "./pages/Student/StudentEvents";
import LoginPage from "./pages/Home/Auth/LoginPage";
import RegisterPage from "./pages/Home/Auth/RegisterPage";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
