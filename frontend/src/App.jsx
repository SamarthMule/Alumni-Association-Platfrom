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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
