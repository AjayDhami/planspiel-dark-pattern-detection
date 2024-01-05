import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";
import WebsiteViewPage from "./pages/client/WebsiteViewPage";
import ExpertSignin from "./pages/expert/ExpertSignin";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import WebsiteDashboard from "./pages/expert/WebsiteDashboard";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext1";
import { ExpertProvider } from "./context/ExpertContext";
function App() {
  return (
    <AuthProvider>
      <ExpertProvider>
      <Routes>
        {/* <!-- Common routes --> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/expertsignin" element={<ExpertSignin/>}/>
        {/* <!-- Client Dashboard routes --> */}
        <Route path="/client" element={<ClientDashboardLayout />}>
          {/* Redirect to actual dashboard instead of just layout page */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="website/:webId" element={<WebsiteViewPage />} />
        </Route>
        <Route path="/expertdashboard" element={<ExpertDashboard/>}/>
        <Route path="/websitedash" element={<WebsiteDashboard/>}/>
      </Routes>
      </ExpertProvider>
    </AuthProvider>
  );
}

export default App;
