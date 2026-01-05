import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Beranda from "./pages/Beranda.jsx";
import PersebaranList from "./pages/PersebaranList.jsx";
import PersebaranDetail from "./pages/PersebaranDetail.jsx";
import MapPage from "./pages/MapPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from "./pages/LoginPage.jsx";  


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/persebaran" element={<PersebaranList />} />
        <Route path="/persebaran/:id" element={<PersebaranDetail />} />
        <Route path="/peta" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
