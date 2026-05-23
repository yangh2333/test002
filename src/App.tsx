import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Strategy from './pages/Strategy';
import Execution from './pages/Execution';
import Sales from './pages/Sales';
import Quality from './pages/Quality';
import Team from './pages/Team';
import Users from './pages/Users';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute permission="dashboard">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/strategy" element={
            <ProtectedRoute permission="strategy">
              <Strategy />
            </ProtectedRoute>
          } />
          <Route path="/execution" element={
            <ProtectedRoute permission="execution">
              <Execution />
            </ProtectedRoute>
          } />
          <Route path="/sales" element={
            <ProtectedRoute permission="sales">
              <Sales />
            </ProtectedRoute>
          } />
          <Route path="/quality" element={
            <ProtectedRoute permission="quality">
              <Quality />
            </ProtectedRoute>
          } />
          <Route path="/team" element={
            <ProtectedRoute permission="team">
              <Team />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute permission="userManagement">
              <Users />
            </ProtectedRoute>
          } />
        </Routes>
      </MainLayout>
    </Router>
  );
}
