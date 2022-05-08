import { FC, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useStore } from "./hooks/store";
import ProjectsPage from "./pages/ProjectsPage";
import IndexPage from "./pages/IndexPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { privateApi } from "./services/api";
import ProjectPage from "./pages/ProjectPage";
import ProjectSidebar from "./components/ProjectSidebar";
import Overview from "./pages/project/Overview";
import TaskList from "./pages/project/TaskList";
import DashboardSidebar from "./components/DashboardSidebar";

const PublicRoute: FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return <Outlet />;
};

const PrivateRoute: FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="h-screen md:grid md:grid-cols-[20%_80%]">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
};

const ProjectRoute: FC<{ user: any }> = ({ user }) => {
  if (!user) return <Navigate to="/" />;

  return (
    <div className="h-screen md:grid md:grid-cols-[20%_80%]">
      <ProjectSidebar />
      <Outlet />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser } = useStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await privateApi.get("/api/v1/users/me");
        if (res.data.ok) {
          setUser(res.data.result);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute user={user} />}>
          <Route path="" element={<IndexPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute user={user} />}>
          <Route path="" element={<Navigate to="projects" />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
        <Route path="/project" element={<ProjectRoute user={user} />}>
          <Route path="" element={<Navigate to="/dashboard/projects" />} />
          <Route path=":projectId" element={<ProjectPage />}>
            <Route path="" element={<Navigate to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="tasks" element={<TaskList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
