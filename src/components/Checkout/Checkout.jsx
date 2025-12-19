import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/selectors/cartSelectors';
import { clearCart } from '../../store/actions/cartActions';
import { formatPrice } from '../../utils/currency';
import Modal from '../Modal/Modal';
import './Checkout.css';

/**
 * Checkout Component
 * Displays a form to collect user details and order summary with Place Order button
 */
const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Form state - stores user input data for shipping information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  // Modal state - controls visibility of order placed confirmation modal
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission - validates form and processes order
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear cart items from Redux store
    dispatch(clearCart());
    
    // Show order placed confirmation modal
    setShowOrderPlacedModal(true);
  };

  // Handle modal close - closes modal and redirects to home page
  const handleModalClose = () => {
    setShowOrderPlacedModal(false);
    // Redirect to home page automatically after closing modal
    navigate('/');
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>No items in cart</h2>
          <p>Please add items to your cart before checkout.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form-container">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="place-order-button">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-quantity">Qty: {item.quantity}</span>
                </div>
                <span className="summary-item-price">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Order Placed Confirmation Modal */}
      <Modal
        isOpen={showOrderPlacedModal}
        onClose={handleModalClose}
        title="Order Placed Successfully!"
      >
        <div className="order-placed-content">
          <div className="order-success-icon">✓</div>
          <p className="order-placed-message">Your order has been placed successfully!</p>
          <p className="order-placed-submessage">You will be redirected to the home page.</p>
          <button onClick={handleModalClose} className="order-placed-button">
            Continue Shopping
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;

