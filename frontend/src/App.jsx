import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegisterPage from "./pages/RegisterPage";
import StudentProfile from "./pages/StudentProfile";
import Home from "./pages/Home";
import OtpVerificationPage from "./pages/Otp";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
