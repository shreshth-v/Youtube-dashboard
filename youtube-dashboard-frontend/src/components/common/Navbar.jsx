import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="h-16 bg-slate-800 flex items-center justify-between px-6 shadow-md border-b border-slate-700">
      <h1 className="text-xl font-semibold text-white">YouTube Dashboard</h1>

      <div className="text-white text-md font-medium">
        {authUser?.name || "User"}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
