import { useState, useEffect } from 'react';

/**
 * Custom Hook: useProducts
 * Fetches product data from the DummyJSON API
 * 
 * This hook:
 * - Uses useEffect to fetch products when the component mounts
 * - Manages loading, error, and products state
 * - Handles API errors gracefully
 * - Returns an object with products array, loading boolean, and error message
 * 
 * @returns {Object} Object containing:
 *   - products: Array of product objects from API
 *   - loading: Boolean indicating if data is being fetched
 *   - error: String with error message if fetch failed, null otherwise
 * 
 * Usage:
 * const { products, loading, error } = useProducts();
 */
const useProducts = () => {
  // State to store the list of products fetched from API
  const [products, setProducts] = useState([]);
  
  // State to track if data is currently being fetched
  const [loading, setLoading] = useState(true);
  
  // State to store any error messages from failed API calls
  const [error, setError] = useState(null);

  /**
   * useEffect Hook
   * Runs once when the component mounts (empty dependency array [])
   * Fetches product data from the DummyJSON API
   */
  useEffect(() => {
    /**
     * Async Function: fetchProducts
     * Performs the actual API call to fetch products
     * Handles success and error cases appropriately
     */
    const fetchProducts = async () => {
      try {
        // Set loading to true and clear any previous errors
        setLoading(true);
        setError(null);
        
        // Fetch all products from DummyJSON API (increased limit to get more products)
        const response = await fetch('https://dummyjson.com/products?limit=100');
        
        // Check if the response is successful (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Extract products array from response, default to empty array if undefined
        // The API returns { products: [...], total: 100, skip: 0, limit: 30 }
        setProducts(data.products || []);
      } catch (err) {
        // Handle any errors that occur during fetch or parsing
        // Store error message for display to user
        setError(err.message || 'Failed to fetch products');
        // Reset products to empty array on error
        setProducts([]);
      } finally {
        // Always set loading to false after fetch completes (success or error)
        setLoading(false);
      }
    };

    // Call the fetch function immediately
    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Return the state values for use in components
  return { products, loading, error };
};

export default useProducts;

