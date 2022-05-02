import { FC, useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useStore } from "./hooks/store";
import Dashboard from "./pages/Dashboard";
import IndexPage from "./pages/IndexPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { privateApi } from "./services/api";

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

  return <Outlet />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser } = useStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await privateApi.get("/api/v1/users/me");
        console.log(res.data);
        if (res.data.ok) {
          setUser(res.data.result.user);
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
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
