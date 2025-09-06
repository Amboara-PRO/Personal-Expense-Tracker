import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const { user, handleLogout } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="flex h-screen overflow-x-hidden">
      <aside
        className={`w-64 bg-indigo-600 text-white flex-shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-0" : "-ml-64"
        }`}
      >
        <div className="flex flex-col p-6 h-full">
          <h1 className="text-2xl font-bold mb-10">💰 Expense Tracker</h1>
          <nav className="flex flex-col gap-4">
            <Link to="/dashboard" className="hover:bg-indigo-700 p-2 rounded">Dashboard</Link>
            <Link to="/expenses" className="hover:bg-indigo-700 p-2 rounded">Expenses</Link>
            <Link to="/add-expense" className="hover:bg-indigo-700 p-2 rounded">Add Expense</Link>
            <Link to="/profile" className="hover:bg-indigo-700 p-2 rounded">Profile</Link>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <div className="flex items-center gap-4">
        
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-indigo-600 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-700">Welcome {user?.email}</h2>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}