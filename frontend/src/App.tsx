import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";
import WebsiteViewPage from "./pages/client/WebsiteViewPage";
import ExpertSignin from "./pages/expert/ExpertSignin";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import WebsiteDashboard from "./pages/expert/WebsiteDashboard";
import SignIn from "./pages/client/SignInPage";
import SignUp from "./pages/client/SignUpPage";
import { AuthProvider } from "./context/AuthContext1";
import LandingPage from "./pages/landing/LandingPage";
import CardFlip from "./pages/landing/CardFlip";
import { ExpertProvider } from "./context/ExpertContext";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import SuperAdminSignin from "./pages/superAdmin/SuperAdminSignin";

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
          <Route path="/adminsignin" element={<SuperAdminSignin/>}/>

          {/* <!-- Client Dashboard routes --> */}
          <Route path="/client" element={<ClientDashboardLayout />}>
            {/* Redirect to actual dashboard instead of just layout page */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="website/:webId" element={<WebsiteViewPage />} />
          </Route>
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/website" element={<WebsiteDashboard />} />
          <Route path="/superAdmin" element={<SuperAdmin />} />
        </Routes>
      </ExpertProvider>
    </AuthProvider>
  );
}

export default App;
