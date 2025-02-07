import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
        <Route index element={
          <>
          <Link to="/login" >Login </Link>
          </>
        } />
          <Route path="login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
