import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/actions/cartActions';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils/currency';
import './CartItem.css';

/**
 * CartItem Component
 * Represents a single item in the cart with quantity controls and remove button
 * 
 * This component displays:
 * - Product image, title, and individual price
 * - Quantity controls (increase/decrease buttons and input field)
 * - Total price for the item (price * quantity)
 * - Remove button to delete item from cart
 * 
 * @param {Object} item - The cart item object containing product details and quantity
 * @param {number} item.id - Unique product identifier
 * @param {string} item.title - Product title/name
 * @param {number} item.price - Individual product price
 * @param {string} item.thumbnail - Product thumbnail image URL
 * @param {number} item.quantity - Current quantity of the item in cart
 */
const CartItem = ({ item }) => {
  // Get dispatch function from Redux to dispatch cart actions
  const dispatch = useDispatch();

  /**
   * Handle remove from cart
   * Dispatches REMOVE_FROM_CART action to remove this item completely from the cart
   */
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  /**
   * Handle quantity decrease
   * Decreases the quantity by 1, but ensures quantity never goes below 1
   * (Minimum quantity constraint enforced by checking if quantity > 1)
   */
  const handleDecrease = () => {
    // Only decrease if current quantity is greater than 1
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, item.quantity - 1));
    }
  };

  /**
   * Handle quantity increase
   * Increases the quantity by 1 when user clicks the + button
   */
  const handleIncrease = () => {
    dispatch(updateQuantity(item.id, item.quantity + 1));
  };

  /**
   * Handle quantity input change
   * Allows users to directly type a quantity value in the input field
   * Validates that the entered quantity is at least 1
   * 
   * @param {Event} e - The change event from the input field
   */
  const handleQuantityChange = (e) => {
    // Parse the input value as an integer (base 10)
    const newQuantity = parseInt(e.target.value, 10);
    
    // Only update if the new quantity is valid (>= 1)
    // This prevents invalid quantities like 0 or negative numbers
    if (newQuantity >= 1) {
      dispatch(updateQuantity(item.id, newQuantity));
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-item-image"
          loading="lazy"
        />
      </div>
      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            onClick={handleDecrease}
            className="quantity-btn"
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
          />
          <button onClick={handleIncrease} className="quantity-btn">
            +
          </button>
        </div>
        <p className="cart-item-total">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button onClick={handleRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;

