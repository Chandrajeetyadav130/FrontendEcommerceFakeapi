import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState({ category: '', priceRange: [0, 1000], deliveryTime: '' });
  const [sort, setSort] = useState('');

  useEffect(() => {
    const getallProduct = async () => {
      const Product = await axios.get("https://fakestoreapi.com/products");
      setProductData(Product.data);
      console.log(Product.data)
    }
    getallProduct();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilter(prev => ({ ...prev, [field]: value }));
  };

  const filteredAndSortedProducts = productData
    .filter(product =>
      (!filter.category || product.category === filter.category) &&
      product.price >= filter.priceRange[0] &&
      product.price <= filter.priceRange[1]
    )
    .sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      return 0;
    });

  return (
    <div className='HomeContainer'>
      <div className="filter-sort-section">
        {/* Category Filter */}
        <div>
          <label>Category:</label>
          <select
            value={filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filter.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
          />
          <span>${filter.priceRange[0]} - ${filter.priceRange[1]}</span>
        </div>

        {/* Sort by Price */}
        <div>
          <label>Sort by Price:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="priceAsc">Low to High</option>
            <option value="priceDesc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="card-container">
        {filteredAndSortedProducts.map((val) => (
          <Link key={val.id} to={`/product/${val.id}`}>
            <div className="card">
              <img src={val.image} alt={val.title} className="card-image" />
              <div className="card-content">
                <h2 className="card-title">{val.category}</h2>
                <h2 className="card-title">{val.title}</h2>
                <p className="card-description">{val.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
