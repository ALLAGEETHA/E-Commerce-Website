import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { formatPrice } from '../../utils/currency';
import './ProductDetail.css';

/**
 * ProductDetail Component
 * Shows detailed information about a selected product
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * useEffect Hook
   * Fetches product details from API when component mounts or product ID changes
   * 
   * This effect:
   * - Runs when the component first mounts
   * - Runs again whenever the 'id' route parameter changes
   * - Fetches product data from DummyJSON API using the product ID
   * - Updates loading, error, and product state accordingly
   * 
   * Dependencies: [id] - Effect re-runs when id changes (user navigates to different product)
   */
  useEffect(() => {
    /**
     * Async Function: fetchProduct
     * Performs the API call to fetch detailed information for a specific product
     * Uses the product ID from route parameters to construct the API URL
     */
    const fetchProduct = async () => {
      try {
        // Set loading state to true to show loading indicator
        setLoading(true);
        // Clear any previous error messages
        setError(null);
        
        // Fetch product details from API using the product ID from route
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        // Check if the HTTP response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response into JavaScript object
        const data = await response.json();
        
        // Update product state with fetched data
        setProduct(data);
      } catch (err) {
        // Handle errors: network failures, invalid IDs, etc.
        setError(err.message || 'Failed to fetch product details');
        // Optionally set product to null on error
        setProduct(null);
      } finally {
        // Always set loading to false after fetch completes (success or error)
        setLoading(false);
      }
    };

    // Only fetch if we have a valid product ID
    if (id) {
      fetchProduct();
    }
  }, [id]); // Dependency array: re-run effect when id changes

  // Handle add to cart button click
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  // Display error state
  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Error loading product</h2>
          <p>{error || 'Product not found'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>
      <div className="product-detail">
        <div className="product-detail-images">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="product-detail-main-image"
            loading="lazy"
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-brand">Brand: {product.brand || 'N/A'}</p>
          <p className="product-detail-price">{formatPrice(product.price)}</p>
          <div className="product-detail-rating">
            <span>⭐ {product.rating}</span>
            <span className="product-detail-stock">
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <div className="product-detail-specs">
            <h3>Specifications</h3>
            <ul>
              <li>Category: {product.category}</li>
              <li>Discount: {product.discountPercentage}%</li>
            </ul>
          </div>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-detail-btn"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

