import { Routes, Route, useLocation } from "react-router-dom";
import { Admin, Home, Login, Videos } from "./pages";
function App() {
  const location = useLocation();
  return (
    <div className="App">

      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="acceso" element={<Login />} />
        <Route path="admin" element={<Admin />} />
      </Routes>

    </div>
  );
}

export default App;
