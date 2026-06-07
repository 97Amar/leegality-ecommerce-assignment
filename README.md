# EComm Leegality Assignment

A responsive E-commerce application built using React, TypeScript, and Vite. The application allows users to browse products, view product details, apply filters, and navigate through paginated product listings.

## 🚀 Tech Stack

* React 19
* TypeScript
* Vite
* React Router DOM
* Axios
* SCSS / SASS
* React Bootstrap
* React Select
* React Toastify

---

## Features Implemented

### Product Listing

* Fetch products from DummyJSON API
* Responsive product grid layout
* Product image, title, price, and rating display

### Product Details

* Dedicated product detail page
* Dynamic routing using product id
* Product description, category, brand, and pricing information

### Filters

* Category Filter
* Brand Filter
* Price Range Filter

### Pagination

* API-based pagination using limit and skip parameters

### Loading & Error Handling

* Loading states while fetching data
* Error handling for failed API requests

---

## Future-Ready Foundation

Although this assignment primarily focuses on product listing, filtering, pagination, and product details, the project was initially structured with scalability and production-readiness in mind.

### Centralized API Layer

* Axios-based API service architecture
* Common request/response handling
* Reusable API wrapper functions

### Authentication Ready

* Authorization token injection support prepared within the API layer
* Designed to easily integrate protected APIs in future iterations

### Security Preparation

* CryptoJS dependency and encryption-ready architecture added for future secure payload handling
* AES encryption can be integrated when backend encryption support is available

### File Upload Readiness

* FormData utility structure prepared to support file upload features without major architectural changes

### Global Error Handling

The API layer is structured to support centralized handling for:

* 401 Unauthorized
* 403 Forbidden
* Network failures
* Common API errors

These capabilities were prepared during the initial setup to make the codebase easier to scale for real-world production requirements while keeping the current assignment implementation focused on the requested functionality.

---

## Assumptions Made

* Brand filters are generated dynamically from product data because DummyJSON does not provide a dedicated brands endpoint.
* Category filters are fetched from the categories endpoint.
* Price filtering is performed on the client side.
* Product data is fetched from DummyJSON APIs.
* Pagination is implemented using API limit and skip parameters.

---

## Architectural Decisions

* Reusable FormControl component for form inputs.
* Shared MainLayout component for consistent page structure.
* Reusable Navbar, Sidebar, ProductCard, and Pagination components.
* Centralized API layer using Axios.
* TypeScript interfaces for better maintainability and type safety.
* SCSS used for modular and scalable styling.
* Component-based folder structure for better scalability and separation of concerns.

---

## Improvements If Given More Time

* RTK Query or React Query integration
* Unit and integration testing using Vitest and React Testing Library
* Skeleton loaders for improved user experience
* Debounced search functionality
* Product sorting options
* Accessibility improvements
* Advanced mobile responsiveness
* Wishlist and cart management
* Route-based code splitting using React.lazy and Suspense

---

## Project Structure

```text
src
├── api
├── assets
├── components
├── layouts
├── pages
├── routes
├── services
├── styles
└── utils
```

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Environment Variables (Optional Future Setup)

```env
VITE_APP_AUTH_URL=your_api_url
VITE_APP_ENCRYPT=true
VITE_APP_ENCRYPT_KEY=your_secret_key
```

These variables are prepared for future authentication and encryption support and are not required for the current assignment implementation.

---

Built for the Leegality Frontend Assessment.
