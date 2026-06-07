import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../services/interface";
import { useCart } from "../../../context/CartContext";
import { ROUTES } from "../../../constants/constant";
import ProductCardSkeleton from "./ProductCardSkeleton/ProductCardSkeleton";
import "./ProductCard.scss";

interface ProductCardProps {
  product?: IProduct;
  loading?: boolean;
}

const ProductCard = memo(({ product, loading }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (!product) return null;

  const discount = Math.round(product.discountPercentage || 0);
  const originalPrice = product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : product.price;
  const savings = originalPrice - Math.round(product.price);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`${ROUTES.PRODUCT_DETAIL}/${product.id}`)}
    >
      {discount > 0 && (
        <div className="discount-badge">
          {discount}% OFF
        </div>
      )}

      <div className="image-container">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="content">
        <h3 className="title">{product.title}</h3>

        <div className="price-row">
          <span className="current-price">₹{Math.round(product.price)}</span>
          {discount > 0 && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>

        {discount > 0 && (
          <div className="savings">
            Save - ₹{savings}
          </div>
        )}

        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;