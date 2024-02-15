import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';
import AddPet from './pages/AddPet';
import EditListing from './pages/EditListing';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/crear-cuenta" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mi-cuenta" element={<Profile />} />
            <Route path="/añadir-mascota" element={<AddPet />} />
            <Route
              path="/editar-publicacion/:listingId"
              element={<EditListing />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
