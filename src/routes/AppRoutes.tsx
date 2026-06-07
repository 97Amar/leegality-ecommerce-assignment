import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../commponent/features/ProductList/ProductList";
import ProductDetailPage from "../commponent/features/ProductDetails/ProductDetailPage";
import Home from "../commponent/features/Home/Home";
import CartPage from "../commponent/features/Cart/CartPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/product/:id"
          element={<ProductDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;