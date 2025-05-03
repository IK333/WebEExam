import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import AuthContext from './context/AuthContext';
import CompanyList from './components/CompanyList';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

const App = () => {
  const { user, logoutUser, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      <Navbar user={user} isAdmin={isAdmin} logout={logoutUser} />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginForm />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;