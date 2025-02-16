import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import StudentProfile from "./pages/StudentProfile";
import Home from "./pages/Home";
import OtpVerificationPage from "./pages/Otp";
import StudentDashboard from "./pages/StudentDashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/otp" element={<OtpVerificationPage/>}/>

          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/studentdashboard" element={<StudentDashboard/>} />
        {/* <Route path="/studentnetwork" element={<Section title="Network" />} />
        <Route path="/studentjobs" element={<Section title="Jobs" />} />
        <Route path="/studentevents" element={<Section title="Events" />} />
        <Route path="/studentmentorship" element={<Section title="Mentorship" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
