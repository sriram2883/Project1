import React, { useEffect, useState } from "react";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null); // Default is null
  const [search, setSearch] = useState("");

  // Get the user from localStorage on initial render
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser); // Update user state if there is a saved user
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Clear user state on logout
  };

  const location = useLocation(); // useLocation() is valid here as App is inside Router

  return (
    <div>
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
            {user?.role === "Admin" && (  // Check if user is admin
              <Nav.Link as={Link} to="/admin">
                Admin Portal
              </Nav.Link>
            )}
          </Nav>

          {/* Conditionally render search bar based on location */}
          {location.pathname === "/" && (
            <Form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          )}

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
              user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
