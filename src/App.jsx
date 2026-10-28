import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Header from './Components/header';
import Footer from './Components/footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';
import PostPage from './pages/PostPage';
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}