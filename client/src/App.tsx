import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import Opportunities from "./pages/Opportunities";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Inspirations from "./pages/Inspirations";
import TechAreas from "./pages/TechAreas";
import Mentorship from "./pages/Mentorship";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

const RootRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/comunidade" replace /> : <Home />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/auth" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/comunidade" element={<ProtectedLayout><Community /></ProtectedLayout>} />
          <Route path="/mentoria" element={<ProtectedLayout><Mentorship /></ProtectedLayout>} />
          <Route path="/chat/:connectionId" element={<ProtectedLayout><Chat /></ProtectedLayout>} />
          <Route path="/inspiracoes" element={<ProtectedLayout><Inspirations /></ProtectedLayout>} />
          <Route path="/areas" element={<ProtectedLayout><TechAreas /></ProtectedLayout>} />
          <Route path="/oportunidades" element={<ProtectedLayout><Opportunities /></ProtectedLayout>} />
          <Route path="/perfil/:userId" element={<ProtectedLayout><Profile /></ProtectedLayout>} />
          <Route path="/editar-perfil" element={<ProtectedLayout><EditProfile /></ProtectedLayout>} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
