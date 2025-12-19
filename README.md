# ShoppyGlobe - E-commerce Application

A modern, fully-featured e-commerce application built with React, Redux, and React Router. This application demonstrates best practices in React development including state management, routing, code splitting, and responsive design.

## 🚀 Features

- **Product Catalog**: Browse through a wide range of products fetched from DummyJSON API
- **Product Search**: Real-time search functionality to filter products by name or description
- **Product Details**: Detailed view of individual products with specifications
- **Shopping Cart**: Add, remove, and adjust quantities of products in your cart
- **Checkout Process**: Complete checkout flow with form validation and order confirmation
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Performance Optimized**: Code splitting and lazy loading for optimal performance
- **Error Handling**: Comprehensive error handling for API calls and edge cases

## 🛠️ Tech Stack

- **React 19.2.0** - Modern UI library for building user interfaces
- **Vite 7.2.4** - Fast build tool and development server
- **Redux 5.0.1** - Predictable state container for JavaScript apps
- **React Router 7.11.0** - Declarative routing using createBrowserRouter
- **PropTypes 15.8.1** - Runtime type checking for React props

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher recommended)
- **npm** (version 7.x or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🔧 Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone the Repository

```bash
# Clone the repository to your local machine
git clone <YOUR_GITHUB_REPO_URL>
cd shoppyglobe
```

### Step 2: Install Dependencies

```bash
# Install all required dependencies
npm install
```

This will install all the packages listed in `package.json`, including React, Redux, React Router, and their dependencies.

### Step 3: Start the Development Server

```bash
# Start the Vite development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port). The development server supports hot module replacement (HMR), so changes to your code will be reflected immediately in the browser.

### Step 4: Build for Production

```bash
# Create an optimized production build
npm run build
```

This will create a `dist` folder containing the optimized production files ready for deployment.

### Step 5: Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## 📁 Project Structure

```
shoppyglobe/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # React components
│   │   ├── Header/        # Navigation header component
│   │   ├── ProductList/   # Product listing page component
│   │   ├── ProductItem/   # Individual product card component
│   │   ├── ProductDetail/ # Product detail page component
│   │   ├── Cart/          # Shopping cart page component
│   │   ├── CartItem/      # Individual cart item component
│   │   ├── Checkout/      # Checkout page component
│   │   ├── NotFound/      # 404 error page component
│   │   └── Modal/         # Reusable modal component
│   ├── store/             # Redux store configuration
│   │   ├── actions/       # Redux action creators
│   │   │   ├── cartActions.js
│   │   │   └── searchActions.js
│   │   ├── reducers/      # Redux reducers
│   │   │   ├── cartReducer.js
│   │   │   ├── searchReducer.js
│   │   │   └── rootReducer.js
│   │   ├── selectors/     # Redux selectors
│   │   │   ├── cartSelectors.js
│   │   │   └── searchSelectors.js
│   │   └── index.js       # Store configuration
│   ├── hooks/             # Custom React hooks
│   │   └── useProducts.js # Custom hook for fetching products
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # App-level styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── .gitignore            # Git ignore file
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🎯 Key Components Explained

### App Component
The main application component that sets up routing using `createBrowserRouter` and implements code splitting with `React.lazy` and `Suspense` for optimal performance.

### ProductList Component
Displays the list of products fetched from the API. Uses the custom `useProducts` hook to fetch data and implements search functionality using Redux state.

### ProductDetail Component
Shows detailed information about a selected product. Fetches product details using `useEffect` when the component mounts or route parameters change.

### Cart Component
Manages the shopping cart, displaying all items with their quantities and total price. Provides navigation to checkout.

### Checkout Component
Handles the checkout process with a form to collect shipping information. On successful order placement, shows a custom modal confirmation and redirects to home.

## 🔌 API Integration

This application uses the [DummyJSON API](https://dummyjson.com/) for product data:

- **Products List**: `GET https://dummyjson.com/products`
- **Product Details**: `GET https://dummyjson.com/products/{id}`

The API provides a realistic dataset of products including titles, descriptions, prices, images, and more.

## 📝 State Management

The application uses Redux for state management:

- **Cart State**: Manages items in the shopping cart, including quantities
- **Search State**: Manages the search query for filtering products

### Redux Structure:
- **Actions**: Define what actions can be performed (add to cart, remove from cart, update quantity, set search query)
- **Reducers**: Handle state updates based on actions
- **Selectors**: Provide access to specific parts of the state

## 🎨 Styling

The application uses CSS for styling with a focus on:
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Modern UI**: Clean, intuitive interface with smooth transitions and hover effects
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🚦 Routing

The application uses React Router's `createBrowserRouter` with the following routes:

- `/` - Home page (Product List)
- `/product/:id` - Product detail page (dynamic route)
- `/cart` - Shopping cart page
- `/checkout` - Checkout page
- `*` - 404 Not Found page (catch-all route)

## ⚡ Performance Optimizations

1. **Code Splitting**: All route components are lazy-loaded using `React.lazy()`
2. **Lazy Loading Images**: All images use the `loading="lazy"` attribute
3. **Memoization**: Product filtering uses `useMemo` to prevent unnecessary recalculations

## 🧪 Usage Guide

### Adding Products to Cart
1. Browse products on the home page
2. Click on a product to view details
3. Click "Add to Cart" button on product card or detail page
4. View cart by clicking the cart icon in the header

### Managing Cart Items
1. Navigate to the cart page
2. Use the `+` and `−` buttons to adjust quantities
3. Click "Remove" to remove an item from cart
4. Minimum quantity is 1 per item

### Checkout Process
1. Add items to cart
2. Click "Proceed to Checkout" on the cart page
3. Fill in shipping information (all fields required)
4. Click "Place Order"
5. Review order confirmation modal
6. Automatically redirected to home page

### Searching Products
1. Use the search bar on the home page
2. Type product name or description
3. Products filter in real-time
4. Clear search to show all products

## 🐛 Troubleshooting

### Application won't start
- Ensure Node.js and npm are installed: `node --version` and `npm --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Check if port 5173 is available or use a different port

### API errors
- Check your internet connection
- Verify the DummyJSON API is accessible
- Check browser console for specific error messages

### Build errors
- Ensure all dependencies are installed: `npm install`
- Clear cache and rebuild: `npm run build`
- Check for syntax errors in console output

## 📦 Deployment

To deploy the application:

1. Build the production version: `npm run build`
2. The `dist` folder contains all optimized files
3. Deploy the `dist` folder to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any web server

## 🤝 Contributing

This is a project submission. For improvements or issues, please refer to the repository maintainer.

## 📄 License

This project is created for educational purposes.

## 🔗 GitHub Repository

**Repository URL:** [YOUR_GITHUB_REPO_URL_HERE]

Please replace `YOUR_GITHUB_REPO_URL_HERE` with your actual GitHub repository URL when submitting.

## ✅ Requirements Checklist

- ✅ Created with Vite
- ✅ All required components implemented (App, Header, ProductList, ProductItem, ProductDetail, Cart, CartItem, NotFound, Checkout)
- ✅ Props used correctly with PropTypes validation
- ✅ Data fetching with useEffect and custom hook (useProducts)
- ✅ Redux for state management (cart and search)
- ✅ Event handling for cart operations
- ✅ React Router with createBrowserRouter and dynamic routes
- ✅ Code splitting with React.lazy and Suspense
- ✅ Lazy loading for images
- ✅ Responsive CSS styling
- ✅ Error handling for API calls
- ✅ Comments and proper indentation throughout code
- ✅ node_modules in .gitignore

---

**Note**: Remember to include at least 25 relevant commits in your GitHub repository history before submission.
