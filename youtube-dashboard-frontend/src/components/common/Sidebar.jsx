import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiBookOpen } from "react-icons/fi";

const menuItems = [
  { name: "Home", path: "/", icon: <FiHome /> },
  { name: "Notes", path: "/notes", icon: <FiBookOpen /> },
  { name: "Logs", path: "/logs", icon: <FiFileText /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 h-screen p-4 border-r border-slate-700 hidden md:block">
      <nav className="flex flex-col gap-2">
        {menuItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
