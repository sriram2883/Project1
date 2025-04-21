import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/products/${id}`);
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.rating ||
      !newProduct.category
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("https://localhost:5001/api/products", newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        rating: "",
        category: "",
      });
      fetchProducts(); // Refresh list after adding a new product
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product", err);
      alert("Failed to add product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Add Product Form */}
      <div className="mb-4">
        <h4>Add New Product</h4>
        <form onSubmit={handleAddProduct}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              value={newProduct.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>

      {/* Product List Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Placeholder for future "Add Product" feature */}
      <div className="alert alert-info mt-4">
        <strong>Note:</strong> Product addition functionality is now available.
      </div>
    </div>
  );
};

export default AdminDashboard;
