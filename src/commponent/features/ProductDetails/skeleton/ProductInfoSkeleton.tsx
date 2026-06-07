const ProductInfoSkeleton = () => {
  return (
    <div className="product-info">
      <div className="skeleton-heading"></div>

      <div className="price-rating">
        <div className="skeleton-price"></div>
        <div className="skeleton-rating"></div>
      </div>

      <div className="meta">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;