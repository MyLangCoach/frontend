import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Profile from "./pages/profile";
import Transactions from "./pages/Transactions";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/Error/NotFound";
import Users from "./pages/users";
import LiveClasses from "./pages/live-classes";
import CreateClass from "./pages/live-classes/create-new-class";
import Payouts from "./pages/payouts";
import SettingsPage from "./pages/settings";
import CoachStudent from "./pages/student/coach-student-page";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/create-new-class" element={<CreateClass />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/students" element={<CoachStudent />} />
        
     

        {/* Protected Routes */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
              <Profile />
            // </ProtectedRoute>
          }
        />

        {/* Broken Link */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
