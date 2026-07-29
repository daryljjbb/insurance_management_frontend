import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./pages/Customers";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Login from "./pages/Login.jsx"; // Ensure this filename is correct
import Register from "./pages/Registration";
import useAuth from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

function App() {
  // 1. Call the hook ONLY ONCE to get all values
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // 2. Debugging: This will show you exactly why the screen is white in the Console
  console.log("Auth State:", { isAuthenticated, isAdmin, loading });

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route 
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          
          <Route 
             path="/admin-dashboard" 
             element={isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
          />

          {/* 3. Handle the base URL inside the protected area */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* 4. The Catch-All should point to a specific valid route, 
              or better yet, a 404 page. For now, we point to /dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
