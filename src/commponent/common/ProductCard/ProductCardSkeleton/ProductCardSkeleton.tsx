import "./ProductCardSkeleton.scss";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton-image"></div>

      <div className="content">
        <div className="skeleton-title"></div>
        <div className="skeleton-title short"></div>

        <div className="skeleton-price"></div>

        <div className="skeleton-rating"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;