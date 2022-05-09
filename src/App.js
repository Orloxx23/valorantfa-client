import { Routes, Route, useLocation } from "react-router-dom";
import { Footer, Nav } from "./components";
import { Home, Videos } from "./pages";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Nav/>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />}/>
        <Route path="videos" element={<Videos />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
