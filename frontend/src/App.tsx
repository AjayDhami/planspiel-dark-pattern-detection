import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";
import WebsiteViewPage from "./pages/client/WebsitesPage";
import ExpertSignin from "./pages/expert/ExpertSignin";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import WebsiteDashboard from "./pages/expert/WebsiteDashboard";
import SignIn from "./pages/client/SignInPage";
import SignUp from "./pages/client/SignUpPage";
import { AuthProvider } from "./context/AuthContext1";
import { ExpertProvider } from "./context/ExpertContext";
import LandingPage from "./pages/landing/LandingPage";
import CardFlip from "./pages/landing/CardFlip";

function App() {
  return (
    <AuthProvider>
      <ExpertProvider>
        <Routes>
          {/* <!-- Common routes --> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/cardflip" element={<CardFlip />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/expertsignin" element={<ExpertSignin />} />
          {/* <!-- Client Dashboard routes --> */}
          <Route path="/client" element={<ClientDashboardLayout />}>
            {/* Redirect to actual dashboard instead of just layout page */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="websites" element={<WebsiteViewPage />} />
          </Route>
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/website" element={<WebsiteDashboard />} />
        </Routes>
      </ExpertProvider>
    </AuthProvider>
  );
}

export default App;
