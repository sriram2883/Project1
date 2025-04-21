import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/products");
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minRating) {
      result = result.filter((p) => p.rating >= parseFloat(filters.minRating));
    }

    setFiltered(result);
  }, [search, filters, products]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Browse Products</h2>

      {/* Search & Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="minPrice"
            className="form-control"
            placeholder="Min Price"
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="maxPrice"
            className="form-control"
            placeholder="Max Price"
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            step="0.1"
            name="minRating"
            className="form-control"
            placeholder="Min Rating"
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Product List */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p>
                    <strong>₹{product.price}</strong>
                  </p>
                  <p>Rating: {product.rating}</p>
                  <span className="badge bg-primary">{product.category}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted">No products match the filters.</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
