import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14 Pro",
      description: "Apple smartphone with A16 Bionic chip",
      price: 120000,
      rating: 4.8,
      brand: "Apple",
      category: "Smartphones",
      imageUrl: "https://via.placeholder.com/200x150?text=iPhone+14+Pro",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      description: "Latest Samsung flagship",
      price: 85000,
      rating: 4.5,
      brand: "Samsung",
      category: "Smartphones",
      imageUrl: "https://via.placeholder.com/200x150?text=Galaxy+S23",
    },
    {
      id: 3,
      name: "Sony WH-1000XM4",
      description: "Noise-canceling wireless headphones",
      price: 25000,
      rating: 4.7,
      brand: "Sony",
      category: "Audio",
      imageUrl: "https://via.placeholder.com/200x150?text=Sony+XM4",
    },
    {
      id: 4,
      name: "boAt Airdopes 441",
      description: "Affordable true wireless earbuds",
      price: 1999,
      rating: 4.2,
      brand: "boAt",
      category: "Audio",
      imageUrl: "https://via.placeholder.com/200x150?text=boAt+Airdopes",
    },
    {
      id: 5,
      name: "Dell XPS 13",
      description: "Premium ultrabook with InfinityEdge display",
      price: 145000,
      rating: 4.6,
      brand: "Dell",
      category: "Laptops",
      imageUrl: "https://via.placeholder.com/200x150?text=Dell+XPS+13",
    },
    {
      id: 6,
      name: "HP Pavilion 15",
      description: "Everyday laptop with i5 processor",
      price: 60000,
      rating: 4.0,
      brand: "HP",
      category: "Laptops",
      imageUrl: "https://via.placeholder.com/200x150?text=HP+Pavilion+15",
    },
    {
      id: 7,
      name: "Mango",
      description: "Sweet and juicy mangoes",
      price: 300,
      rating: 4.5,
      brand: "Fresh",
      category: "Fruits",
      imageUrl: "https://via.placeholder.com/200x150?text=Mango",
    },
    {
      id: 8,
      name: "Apple",
      description: "Crisp and delicious apples",
      price: 200,
      rating: 4.3,
      brand: "Fresh",
      category: "Fruits",
      imageUrl: "https://via.placeholder.com/200x150?text=Apple",
    },
    {
      id: 9,
      name: "Office Chair",
      description: "Ergonomic office chair with adjustable height",
      price: 4000,
      rating: 4.6,
      brand: "IKEA",
      category: "Chairs",
      imageUrl: "https://via.placeholder.com/200x150?text=Office+Chair",
    },
    {
      id: 10,
      name: "Recliner Chair",
      description: "Comfortable recliner chair with cup holders",
      price: 12000,
      rating: 4.4,
      brand: "Home Center",
      category: "Chairs",
      imageUrl: "https://via.placeholder.com/200x150?text=Recliner+Chair",
    },
    {
      id: 11,
      name: "T-shirt",
      description: "Cotton T-shirt in multiple colors",
      price: 499,
      rating: 4.1,
      brand: "Levi's",
      category: "Clothes",
      imageUrl: "https://via.placeholder.com/200x150?text=T-shirt",
    },
    {
      id: 12,
      name: "Jeans",
      description: "Slim fit jeans for everyday wear",
      price: 1499,
      rating: 4.3,
      brand: "Wrangler",
      category: "Clothes",
      imageUrl: "https://via.placeholder.com/200x150?text=Jeans",
    },
  ]);

  const [categories, setCategories] = useState(["Smartphones", "Audio", "Laptops", "Fruits", "Chairs", "Clothes"]);
  const [brands, setBrands] = useState(["Apple", "Samsung", "Sony", "boAt", "Dell", "HP"]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    brand: "",
    imageUrl: "",
    newCategory: "",
    newBrand: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [ratingRange, setRatingRange] = useState([1, 5]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleBrandChange = (e) => setSelectedBrand(e.target.value);
  const handlePriceRangeChange = (e) => setPriceRange([parseInt(e.target.value), priceRange[1]]);
  const handleRatingRangeChange = (e) => setRatingRange([parseInt(e.target.value), ratingRange[1]]);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedCategory = currentProduct.category;
    let updatedBrand = currentProduct.brand;

    if (currentProduct.category === "add-new" && currentProduct.newCategory) {
      updatedCategory = currentProduct.newCategory;
      if (!categories.includes(updatedCategory)) {
        setCategories([...categories, updatedCategory]);
      }
    }

    if (currentProduct.brand === "add-new" && currentProduct.newBrand) {
      updatedBrand = currentProduct.newBrand;
      if (!brands.includes(updatedBrand)) {
        setBrands([...brands, updatedBrand]);
      }
    }

    const finalProduct = {
      ...currentProduct,
      category: updatedCategory,
      brand: updatedBrand,
    };

    if (isEdit) {
      setProducts(products.map((p) => (p.id === finalProduct.id ? finalProduct : p)));
    } else {
      setProducts([...products, { ...finalProduct, id: Date.now() }]);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setCurrentProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      rating: "",
      category: "",
      brand: "",
      imageUrl: "",
      newCategory: "",
      newBrand: "",
    });
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEdit(true);
      setCurrentProduct({ ...product, newCategory: "", newBrand: "" });
    } else {
      setIsEdit(false);
      setCurrentProduct({
        id: null,
        name: "",
        description: "",
        price: "",
        rating: "",
        category: "",
        brand: "",
        imageUrl: "",
        newCategory: "",
        newBrand: "",
      });
    }
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "" || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= ratingRange[0] && product.rating <= ratingRange[1];
    const matchesSearchField = product[searchField]?.toString().toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSearchField;
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Search */}
      <div className="d-flex mb-4">
        <select className="form-control me-2" value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="brand">Brand</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${searchField}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters */}
      <div className="d-flex mb-4">
        <select className="form-control me-2" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <select className="form-control" value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Select Brand</option>
          {brands.map((br, i) => (
            <option key={i} value={br}>{br}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
        <div className="d-flex">
          <input type="range" min="0" max="200000" value={priceRange[0]} onChange={handlePriceRangeChange} className="form-control me-2" />
          <input type="range" min="0" max="200000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="form-control" />
        </div>
      </div>

      <div className="mb-4">
        <label>Rating: {ratingRange[0]} - {ratingRange[1]}</label>
        <div className="d-flex">
          <input type="range" min="1" max="5" value={ratingRange[0]} onChange={handleRatingRangeChange} className="form-control me-2" />
          <input type="range" min="1" max="5" value={ratingRange[1]} onChange={(e) => setRatingRange([ratingRange[0], parseInt(e.target.value)])} className="form-control" />
        </div>
      </div>

      <Button variant="danger" onClick={() => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedBrand("");
        setPriceRange([0, 200000]);
        setRatingRange([1, 5]);
      }} className="mb-3">Clear Filters</Button>

      <Button variant="primary" onClick={() => handleOpenModal()} className="mb-4 ms-2">Add Product</Button>

      {/* Product List */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.imageUrl} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <p>Rating: {product.rating}</p>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <Button variant="warning" className="me-2" onClick={() => handleOpenModal(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={currentProduct.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" value={currentProduct.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" value={currentProduct.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control name="rating" type="number" min="1" max="5" value={currentProduct.rating} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={currentProduct.category} onChange={handleChange}>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                <option value="add-new">Add New</option>
              </Form.Select>
              {currentProduct.category === "add-new" && (
                <Form.Control name="newCategory" placeholder="New Category" onChange={handleChange} className="mt-2" />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select name="brand" value={currentProduct.brand} onChange={handleChange}>
                {brands.map((br, i) => <option key={i} value={br}>{br}</option>)}
                <option value="add-new">Add New</option>
              </Form.Select>
              {currentProduct.brand === "add-new" && (
                <Form.Control name="newBrand" placeholder="New Brand" onChange={handleChange} className="mt-2" />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="imageUrl" value={currentProduct.imageUrl} onChange={handleChange} required />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="primary" type="submit" className="ms-2">{isEdit ? "Save Changes" : "Add Product"}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
