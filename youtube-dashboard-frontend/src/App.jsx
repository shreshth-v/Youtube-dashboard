import AppRouter from "./routes/AppRouter";
import { ToastContainer as Toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRouter />
      <Toast position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
