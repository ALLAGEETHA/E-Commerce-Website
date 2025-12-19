import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/actions/searchActions';
import { setCategoryFilter, clearCategoryFilter } from '../../store/actions/filterActions';
import { selectSearchQuery } from '../../store/selectors/searchSelectors';
import { selectCategoryFilter } from '../../store/selectors/filterSelectors';
import useProducts from '../../hooks/useProducts';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

/**
 * ProductList Component
 * Displays a list of products fetched from API with search functionality
 * 
 * This component:
 * - Uses the custom useProducts hook which internally uses useEffect to fetch products
 * - Manages search functionality using Redux state
 * - Filters products based on search query using useMemo for performance optimization
 */
const ProductList = () => {
  // Fetch products using custom hook (which uses useEffect internally)
  // This hook handles the API call, loading state, and error state
  const { products, loading, error } = useProducts();
  
  // Get search query and category filter from Redux store
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectCategoryFilter);
  
  // Get dispatch function to update Redux state
  const dispatch = useDispatch();
  
  // Local state for search input (for controlled input component)
  const [localSearch, setLocalSearch] = useState('');

  // Sync local search state with Redux search query when component mounts
  // This useEffect ensures the local input stays in sync with Redux state
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Extract unique categories from products for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  /**
   * useMemo Hook: Filtered Products
   * Memoizes the filtered product list to prevent unnecessary recalculations
   * 
   * Filtering Logic:
   * - First filters by category if selected
   * - Then filters by search query if provided
   * - Case-insensitive search (converts both query and product text to lowercase)
   * 
   * Dependencies: [products, searchQuery, selectedCategory]
   * Only recalculates when products array, search query, or category filter changes
   * 
   * @returns {Array} Filtered array of products matching the filters
   */
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // First, filter by category if one is selected
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Then, filter by search query if provided
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]); // Recalculate when any filter changes

  /**
   * Handle Search Input Change
   * Updates both local state and Redux state when user types in search input
   * 
   * @param {Event} e - The change event from the search input field
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    // Update local state for controlled input component
    setLocalSearch(value);
    
    // Update Redux state so search query persists across components
    dispatch(setSearchQuery(value));
  };

  /**
   * Handle Category Filter Click
   * Sets or clears the category filter when user clicks a category button
   * 
   * @param {string} category - The category to filter by, or null to clear
   */
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // If clicking the same category, clear the filter
      dispatch(clearCategoryFilter());
    } else {
      // Set the new category filter
      dispatch(setCategoryFilter(category));
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="product-list-container">
        <div className="error">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Category Filter Buttons */}
      {categories.length > 0 && (
        <div className="category-filter-container">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`category-filter-btn ${!selectedCategory ? 'active' : ''}`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h2>No products found</h2>
          <p>
            {(searchQuery || selectedCategory)
              ? `No products match your ${searchQuery ? `search "${searchQuery}"` : ''} ${searchQuery && selectedCategory ? 'and ' : ''}${selectedCategory ? `category filter "${selectedCategory}"` : ''}`
              : 'No products available'}
          </p>
          {(searchQuery || selectedCategory) && (
            <button 
              onClick={() => {
                dispatch(clearCategoryFilter());
                dispatch(setSearchQuery(''));
                setLocalSearch('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="products-count">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} 
            {selectedCategory && ` in "${selectedCategory}"`}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;

