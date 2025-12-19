import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils/currency';
import './ProductItem.css';

/**
 * ProductItem Component
 * Represents a single product with image, title, price, and Add to Cart button
 * @param {Object} product - The product object containing id, title, price, thumbnail, etc.
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  // Handle add to cart button click
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price-rating">
            <p className="product-price">{formatPrice(product.price)}</p>
            {product.discountPercentage > 0 && (
              <span className="product-discount">{product.discountPercentage}% off</span>
            )}
          </div>
          <p className="product-rating">⭐ {product.rating}</p>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

// PropTypes validation
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;

