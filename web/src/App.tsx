import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/login/Login';
import { Register } from './pages/login/Register';
import { Verify } from './pages/login/Verify';
import { Search } from './pages/Search';
import { Userpage } from './pages/Userpage';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminUser } from './pages/admin/AdminUser';
import { AdminUserUpdate } from './pages/admin/AdminUserUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/search" element={<Search />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/user/update" element={<AdminUserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;