import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-900 text-white h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content Area */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Navbar stays fixed at the top of content area */}
        <Navbar />

        {/* Scrollable main content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
