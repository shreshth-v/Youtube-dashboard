import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Notes from "../pages/Notes";
import Logs from "../pages/Logs";
import Login from "../pages/Login";
import Layout from "../components/common/Layout";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";
import { useEffect } from "react";
import UnProtectedRoute from "./UnProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <UnProtectedRoute>
              <Login />
            </UnProtectedRoute>
          }
        />
        {/* Protected Routes inside Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/notes"
          element={
            <Layout>
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/logs"
          element={
            <Layout>
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
