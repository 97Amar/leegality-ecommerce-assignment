import { IProduct } from "../interface";

interface IProductInfoProps {
  product: IProduct;
}
const ProductInfo = ({ product }: IProductInfoProps) => {
  return (
    <div className="product-info">
      <h1>{product.title}</h1>

      <div className="price-rating">
        <span className="price">
          ${product.price}
        </span>

        <div className="rating">
          {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
          <span>({product.rating})</span>
        </div>
      </div>

      <div className="meta">
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;