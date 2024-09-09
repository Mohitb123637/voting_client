import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Result from './pages/Result';
import SignUp from './pages/Sign-up';
import Vote from './pages/Vote';
import CandidateList from './pages/CandidateList';
import PrivateRoute from './components/PrivateRoute';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* public Routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private Routes  */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidateList" element={<CandidateList />} />
          <Route path="vote" element={<Vote />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
