import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";

const staticProducts = [
  // Electronics
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "Apple smartphone with A16 Bionic chip",
    price: 120000,
    rating: 4.8,
    brand: "Apple",
    category: "Smartphones",
    image: "https://via.placeholder.com/200x150?text=iPhone+14+Pro",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Latest Samsung flagship",
    price: 85000,
    rating: 4.5,
    brand: "Samsung",
    category: "Smartphones",
    image: "https://via.placeholder.com/200x150?text=Galaxy+S23",
  },
  // Audio
  {
    id: 3,
    name: "Sony WH-1000XM4",
    description: "Noise-canceling wireless headphones",
    price: 25000,
    rating: 4.7,
    brand: "Sony",
    category: "Audio",
    image: "https://via.placeholder.com/200x150?text=Sony+XM4",
  },
  {
    id: 4,
    name: "boAt Airdopes 441",
    description: "Affordable true wireless earbuds",
    price: 1999,
    rating: 4.2,
    brand: "boAt",
    category: "Audio",
    image: "https://via.placeholder.com/200x150?text=boAt+Airdopes",
  },
  // Laptops
  {
    id: 5,
    name: "Dell XPS 13",
    description: "Premium ultrabook with InfinityEdge display",
    price: 145000,
    rating: 4.6,
    brand: "Dell",
    category: "Laptops",
    image: "https://via.placeholder.com/200x150?text=Dell+XPS+13",
  },
  {
    id: 6,
    name: "HP Pavilion 15",
    description: "Everyday laptop with i5 processor",
    price: 60000,
    rating: 4.0,
    brand: "HP",
    category: "Laptops",
    image: "https://via.placeholder.com/200x150?text=HP+Pavilion+15",
  },
  // Fruits
  {
    id: 7,
    name: "Mango",
    description: "Sweet and juicy mangoes",
    price: 300,
    rating: 4.5,
    brand: "Fresh",
    category: "Fruits",
    image: "https://via.placeholder.com/200x150?text=Mango",
  },
  {
    id: 8,
    name: "Apple",
    description: "Crisp and delicious apples",
    price: 200,
    rating: 4.3,
    brand: "Fresh",
    category: "Fruits",
    image: "https://via.placeholder.com/200x150?text=Apple",
  },
  // Chairs
  {
    id: 9,
    name: "Office Chair",
    description: "Ergonomic office chair with adjustable height",
    price: 4000,
    rating: 4.6,
    brand: "IKEA",
    category: "Chairs",
    image: "https://via.placeholder.com/200x150?text=Office+Chair",
  },
  {
    id: 10,
    name: "Recliner Chair",
    description: "Comfortable recliner chair with cup holders",
    price: 12000,
    rating: 4.4,
    brand: "Home Center",
    category: "Chairs",
    image: "https://via.placeholder.com/200x150?text=Recliner+Chair",
  },
  // Clothes
  {
    id: 11,
    name: "T-shirt",
    description: "Cotton T-shirt in multiple colors",
    price: 499,
    rating: 4.1,
    brand: "Levi's",
    category: "Clothes",
    image: "https://via.placeholder.com/200x150?text=T-shirt",
  },
  {
    id: 12,
    name: "Jeans",
    description: "Slim fit jeans for everyday wear",
    price: 1499,
    rating: 4.3,
    brand: "Wrangler",
    category: "Clothes",
    image: "https://via.placeholder.com/200x150?text=Jeans",
  },
];

// Define brand-category mapping
const categoryBrandMapping = {
  Smartphones: ["Apple", "Samsung", "OnePlus"],
  Audio: ["Sony", "boAt", "JBL"],
  Laptops: ["Dell", "HP", "Lenovo"],
  Fruits: ["Fresh", "Organic", "Hybrid"], // No brands for fruits
  Chairs: ["IKEA", "Home Center", "Urban Ladder"],
  Clothes: ["Levi's", "Wrangler", "Puma"],
};

const categories = [...new Set(staticProducts.map((p) => p.category))];

const HomePage = () => {
  const [filtered, setFiltered] = useState(staticProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  useEffect(() => {
    applyFilters();
  }, [search, selectedCategory, selectedBrands, priceRange]);

  const applyFilters = () => {
    let filtered = staticProducts.filter((product) => {
      const matchName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchBrand =
        selectedCategory === "Fruits" // Skip brand filter for fruits category
          ? true
          : selectedBrands.length > 0
          ? selectedBrands.includes(product.brand)
          : true;
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchName && matchCategory && matchBrand && matchPrice;
    });

    setFiltered(filtered);
  };

  // Group products by category
  const groupedByCategory = filtered.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Get the number of items to show based on the screen size
  const getCarouselItemsPerRow = () => {
    if (window.innerWidth < 576) return 1; // Mobile
    if (window.innerWidth < 768) return 2; // Tablet
    if (window.innerWidth < 992) return 3; // Small screen
    return 4; // Desktop
  };

  return (
    <Container className="mt-4">
      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedBrands([]); // Reset brands when category changes
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={5}>
          {selectedCategory !== "Fruits" && (
            <Select
              isMulti
              options={categoryBrandMapping[selectedCategory]?.map((brand) => ({
                label: brand,
                value: brand,
              }))}
              placeholder="Select Brands"
              onChange={(selected) =>
                setSelectedBrands(selected.map((b) => b.value))
              }
            />
          )}
        </Col>
      </Row>

      {/* Price Slider */}
      <Row className="mb-4">
        <Col>
          <label>
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <input
            type="range"
            className="form-range"
            min={0}
            max={200000}
            step={500}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            className="form-range"
            min={0}
            max={200000}
            step={500}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </Col>
      </Row>

      {/* Carousel for each category */}
      {Object.keys(groupedByCategory).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          <Carousel
            interval={3000}
            wrap={true}
            controls={false}
            indicators={false}
          >
            <Carousel.Item>
              <Row>
                {groupedByCategory[category].map((item, index) => (
                  <Col key={item.id} md={getCarouselItemsPerRow()}>
                    <Card>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>
                          ₹{item.price} | Rating: {item.rating}⭐
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        </div>
      ))}
    </Container>
  );
};

export default HomePage;
