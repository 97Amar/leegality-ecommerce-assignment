
interface IProductDescription {
    text: string;
}
const ProductDescription = ({ text }: IProductDescription) => {
  return (
    <div className="product-description">
      <h3>Description</h3>
      <p>{text}</p>
    </div>
  );
};

export default ProductDescription;