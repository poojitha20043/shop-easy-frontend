import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&w=400'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&w=400'
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&w=400'
    },
    {
      id: 4,
      name: 'Camera',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&w=400'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to ShopEasy</h1>
        <p>Discover amazing products at great prices</p>
        <Link to="/products">
          <button className="cta-button">Shop Now</button>
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 style={{ textAlign: 'center', margin: '2rem 0', fontSize: '2.5rem' }}>
          Featured Products
        </h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: '#f1f3f5' }}>
        <h2 style={{ marginBottom: '3rem' }}>Why Choose Us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="feature">
            <h3>🚚 Free Shipping</h3>
            <p>Free delivery on orders over $50</p>
          </div>
          <div className="feature">
            <h3>💳 Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>
          <div className="feature">
            <h3>↩️ Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <h3>📞 24/7 Support</h3>
            <p>Round the clock customer support</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 ShopEasy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;