import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Nav';
import PublicarPage from './pages/PublicarPage';
import HomePage from './pages/HomePage';
import AdoptarPage from './pages/AdoptarPage';
import PublicadosPage from './pages/PublicadosPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con encabezado, navegación y pie de página */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="adoptar" element={<Layout><AdoptarPage /></Layout>} />
        <Route path="publicar" element={<Layout><PublicarPage /></Layout>} />
        <Route path="publicadas" element={<Layout><PublicadosPage /></Layout>} />
        {/* Ruta sin encabezado, navegación ni pie de página */}
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente Login
function Login() {
  return <LoginPage />;
}

// Componente que agrega encabezado, navegación y pie de página
function Layout({ children }) {
  const location = useLocation();

  const [authenticated, setAuthenticated] = useState(true);

  //Check si el usuario esta logeado y hacer redireccionamiento
  useEffect(() => {
    async function logInCheck() {
      const apiUrl = process.env.REACT_APP_API_URL + '/logInCheck';
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setAuthenticated(response.data);
      } catch (error) {
        setAuthenticated(false);
      }
    }
    logInCheck();
  }, []);

  if (!authenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <React.Fragment>
      <Header />     
      <Nav />
      {children}
      <Footer />
    </React.Fragment>
  );
}

document.body.style.margin = 0;
export default App;
