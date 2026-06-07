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
const ProductReviews = ({ reviews }: IProductReviews) => {
  return (
    <div className="product-reviews">
      <h3>Reviews</h3>

      {reviews?.map((review) => (
        <div
          key={review.date}
          className="review-card"
        >
          <h4>
            {review.reviewerName}
            <span> ⭐⭐⭐⭐ ({review.rating})</span>
          </h4>

          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;