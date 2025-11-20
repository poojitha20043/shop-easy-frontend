import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchTerm]);

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(response.data.map(product => product.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = existingCart.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    alert(`${product.name} added to cart!`);
  };

  const addSampleProducts = async () => {
    try {
      await axios.post('http://localhost:5000/api/add-sample-products');
      alert('Sample products added!');
      loadProducts();
    } catch (error) {
      alert('Error adding sample products');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Header Section */}
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
        
        {/* Add Sample Products Button (for testing) */}
        <button 
          onClick={addSampleProducts}
          className="add-sample-btn"
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Add Sample Products to Database
        </button>

        {/* Search and Filter */}
        <div className="products-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-stats">
          <p>Showing {filteredProducts.length} of {products.length} products</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-category">{product.category}</div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-meta">
                    <div className="product-price">${product.price}</div>
                    <div className="product-stock">
                      {product.stock > 0 ? 
                        `${product.stock} in stock` : 
                        'Out of stock'
                      }
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;