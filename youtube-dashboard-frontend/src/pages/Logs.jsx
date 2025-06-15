import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await apiClient.get("/logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-white">Activity Logs</h2>

      <ul className="space-y-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <li
              key={log._id}
              className="bg-slate-800 p-4 rounded-xl shadow-md border border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-lg font-semibold text-blue-400">
                {log.action}
              </div>
              <div className="text-sm text-gray-300 mt-1">{log.details}</div>
              <div className="text-xs text-gray-500 mt-2">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-sm">No activity logs found.</li>
        )}
      </ul>
    </div>
  );
}
