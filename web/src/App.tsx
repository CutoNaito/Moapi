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
import { HelpHome } from './pages/help/HelpHome';
import { HelpCreate } from './pages/help/HelpCreate';
import { HelpPost } from './pages/help/HelpPost';

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
        <Route path="/help" element={<HelpHome />} />
        <Route path="/help/create" element={<HelpCreate />} />
        <Route path="/help/post" element={<HelpPost />} />
      </Routes>
    </Router>
  );
}

export default App;