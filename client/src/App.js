import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import AdminDashboard from "./Components/AdminDashboard";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 sticky-top">
        <Navbar.Brand as={Link} to="/">
          🛍️ ShopEase
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={<HomePage user={user} searchTerm={search} />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
