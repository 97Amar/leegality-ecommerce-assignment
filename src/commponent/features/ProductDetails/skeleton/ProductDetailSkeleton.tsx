import ProductGallerySkeleton from "./ProductGallerySkeleton";
import ProductInfoSkeleton from "./ProductInfoSkeleton";
import ProductDescriptionSkeleton from "./ProductDescriptionSkeleton";
import ProductReviewsSkeleton from "./ProductReviewsSkeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="product-detail-page">
      <div className="product-layout">
        <div className="left-panel">
          <ProductGallerySkeleton />
        </div>

        <div className="right-panel">
          <ProductInfoSkeleton />
          <ProductDescriptionSkeleton />
          <ProductReviewsSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;