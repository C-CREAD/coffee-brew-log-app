import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrewLog from "./pages/BrewLog";
import AddBrew from "./pages/AddBrew";
import EditBrew from "./pages/EditBrew";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<BrewLog/>} title={"Brews"}/>
          <Route path="/brews/add" element={<AddBrew/>} />
          <Route path="/brews/:id/edit" element={<EditBrew/>} />
        </Routes>
      </Router>
  );
}

export default App;
