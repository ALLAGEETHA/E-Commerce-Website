import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

// Lazy load components for code splitting
const ProductList = lazy(() => import('./components/ProductList/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const Login = lazy(() => import('./components/Login/Login'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner">Loading...</div>
  </div>
);

/**
 * Main App Component
 * Sets up routing using createBrowserRouter and wraps components with Suspense for lazy loading
 */
function App() {
  // Define routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        </>
      ),
    },
    {
      path: '/product/:id',
      element: (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetail />
          </Suspense>
        </>
      ),
    },
    {
      path: '/cart',
      element: (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        </>
      ),
    },
    {
      path: '/checkout',
      element: (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: (
        <>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
