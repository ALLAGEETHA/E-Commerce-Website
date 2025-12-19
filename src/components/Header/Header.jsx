import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../store/selectors/cartSelectors';
import './Header.css';

/**
 * Header Component
 * Displays the navigation menu and shopping cart icon with item count
 */
const Header = () => {
  // Get cart items count from Redux store
  const cartItemsCount = useSelector(selectCartItemsCount);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShoppyGlobe</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

