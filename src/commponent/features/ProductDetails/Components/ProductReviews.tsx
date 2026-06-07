interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
interface IProductReviews {
  reviews: IProductReview[];
}

const renderStars = (rating: number) => {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
};

const ProductReviews = ({ reviews }: IProductReviews) => {
  return (
    <div className="product-reviews">
      <h3>Reviews</h3>

      {reviews?.map((review) => (
        <div key={review.date} className="review-card">
          <div className="review-header">
            <span className="reviewer-name">{review.reviewerName}</span>
            <span className="review-stars">
              {renderStars(review.rating)}
              <span className="review-count">({review.rating})</span>
            </span>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;

