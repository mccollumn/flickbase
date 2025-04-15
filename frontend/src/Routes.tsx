import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppDispatch } from "./store";
import { isAuth } from "./store/actions/users";
import { Loader } from "./utils/components";
import MainLayout from "./hoc/MainLayout";
import Home from "./components/home";
import Header from "./components/navigation/Header";
import Auth from "./components/auth";
import Dashboard from "./components/dashboard";
import DashboardMain from "./components/dashboard/main";
import AdminArticles from "./components/dashboard/articles";
import AddArticle from "./components/dashboard/articles/edit_add/add";
import AuthGuard from "./hoc/authGuard";

const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(
    (state: { users: { auth: boolean | null } }) => state.users
  );

  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route
                  index
                  element={
                    <AuthGuard>
                      <DashboardMain />
                    </AuthGuard>
                  }
                />
                <Route
                  path="articles"
                  element={
                    <AuthGuard>
                      <AdminArticles />
                    </AuthGuard>
                  }
                />
                <Route
                  path="articles/add"
                  element={
                    <AuthGuard>
                      <AddArticle />
                    </AuthGuard>
                  }
                />
              </Route>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </MainLayout>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
