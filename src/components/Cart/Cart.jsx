import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/selectors/cartSelectors';
import { formatPrice } from '../../utils/currency';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

/**
 * Cart Component
 * Displays the items added to the cart with total price and checkout button
 */
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Display empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="shop-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({cartItems.length}):</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

