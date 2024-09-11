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
import Testing from "./pages/Testing";
import AllCoaches from "./pages/student/all-coaches-page";
import PaymentPage from "./pages/payment";
import StudentLiveClasses from "./pages/live-classes/student-classes";
import VerifyEmailSuccess from "./pages/auth/VerifyEmailSuccess";
import VerifyEmailError from "./pages/auth/VerifyEmailError";
import ViewSingleCoach from "./pages/coach/view-single-coach";
import PaymentError from "./pages/payment/payment-error";
import PaymentSuccess from "./pages/payment/payment-success";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/live-classes"
          element={
            <ProtectedRoute>
              <LiveClasses />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/student/live-classes" element={
           <ProtectedRoute>
          <StudentLiveClasses />
             </ProtectedRoute>
        } />
        <Route path="/create-new-class" element={
           <ProtectedRoute>
             <CreateClass />
           </ProtectedRoute>
        
        } />
            
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/students" element={<CoachStudent />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/coaches" element={<AllCoaches />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/email-verification-success"
          element={<VerifyEmailSuccess />}
        />
        <Route
          path="/view-coach/:id"
          element={<ViewSingleCoach />}
        />
        <Route
          path="/email-verification-error"
          element={<VerifyEmailError />}
        />
        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />
        <Route
          path="/payment-error"
          element={<PaymentError />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
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
