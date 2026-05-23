import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Strategy from "./pages/Strategy";
import Execution from "./pages/Execution";
import Sales from "./pages/Sales";
import Quality from "./pages/Quality";
import Team from "./pages/Team";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/execution" element={<Execution />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
