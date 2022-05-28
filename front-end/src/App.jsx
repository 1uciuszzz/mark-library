import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import UserProvider from "./providers/MarkaProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import Users from "./pages/Users";
const App = () => {
  return (
    <UserProvider>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/u" element={<Users />} />
            <Route path="/u/:uid" element={<User />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </UserProvider>
  );
};

export default App;
