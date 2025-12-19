import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component
 * Displays a 404 page for unknown routes with proper error details
 */
const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="error-details">
          <p>
            <strong>Requested URL:</strong> <code>{location.pathname}</code>
          </p>
          <p className="error-suggestion">
            Please check the URL or return to the home page.
          </p>
        </div>
        <Link to="/" className="home-button">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

