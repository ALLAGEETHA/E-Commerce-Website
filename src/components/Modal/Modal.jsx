import PropTypes from 'prop-types';
import './Modal.css';

/**
 * Modal Component
 * A reusable modal component for displaying messages and content
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Function to call when modal should close
 * @param {string} title - Title text for the modal
 * @param {ReactNode} children - Content to display in the modal
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  // Don't render if modal is not open
  if (!isOpen) return null;

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Modal header with title and close button */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        {/* Modal body with children content */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

