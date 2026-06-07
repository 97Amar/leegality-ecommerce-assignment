const ProductReviewsSkeleton = () => {
  return (
    <div className="product-reviews">
      <div className="skeleton-section-title"></div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="review-card"
        >
          <div className="skeleton-review-title"></div>

          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewsSkeleton;