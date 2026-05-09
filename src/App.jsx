import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BlogsPage from "./BlogsPage";
import LoginPage from "./LoginPage";
import Navigation from "./components/Navigation";
import BlogPost from "./BlogPost";
import DashboardPage from "./DashboardPage";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
