import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loginpage from "./Pages/Loginpage";
import Registerpage from "./Pages/Registerpage";
import WorkspacePage from "./Pages/WorkspacePage";
import FormPage from "./Pages/FormPage";
import FormbotPage from "./Pages/FormbotPage";
import SettingPage from "./Pages/SettingPage";
import ProtectedRoute from "./Component/ProtectedRoute";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route
          path="/register"
          element={
            <ProtectedRoute Component={Registerpage} isAuthenticate={true} />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute Component={Loginpage} isAuthenticate={true} />
          }
        ></Route>
        <Route
          path="/workspace/:folderId?"
          element={<ProtectedRoute Component={WorkspacePage} />}
        ></Route>
        <Route
          path="/workspace/:folderId?/form/:formId?"
          element={<ProtectedRoute Component={FormPage} />}
        ></Route>
        <Route path="/form/:formId" element={<FormbotPage />}></Route>

        <Route
          path="/setting"
          element={<ProtectedRoute Component={SettingPage} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
