import LoginPage from "./pages/Auth/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/Auth/RegisterPage";
import StudentProfile from "./pages/Student/StudentProfile";
import Home from "./pages/Home";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AlumniDashboard from "./pages/Alumni/AlumniDashboard";
import AlumniNetwork from "./pages/Alumni/AlumniNetwork";
import StudentNetwork from "./pages/Student/StudentNetwork";
import AlumniProfile from "./pages/Alumni/AlumniProfile";
import AlumniJobs from "./pages/Alumni/AlumniJob";
import StudentJob from "./pages/Student/StudentJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/studentprofile" element={<StudentProfile />} />

          {/* Student */}
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentnetwork" element={<StudentNetwork />} />
          <Route path="/studentjobs" element={<StudentJob/>}/>

          {/* Alumni */}
          <Route path="/alumnidashboard" element={<AlumniDashboard />} />
          <Route path="/alumninetwork" element={<AlumniNetwork />} />
          <Route path="/alumniprofile" element={<AlumniProfile />} />
          <Route path="/alumnijobs" element={<AlumniJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
