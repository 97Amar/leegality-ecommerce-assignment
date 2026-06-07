import { useState } from "react";
import CustomPagination from "../../../common/CustomPagination/CustomPagination";

interface IProductGallery {
  images?: string[];
}

const ProductGallery = ({ images = [] }: IProductGallery) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentImage = images[currentPage - 1] || images[0];

  const handlePageChange = (page: number) => {
    if (page < 1 || page > images.length) return;
    setCurrentPage(page);
  };

  return (
    <div className="product-gallery">
      <div className="image-wrapper">
        <img src={currentImage} alt="product" />
      </div>

      <div className="gallery-pagination">
        <CustomPagination
          currentPage={currentPage}
          totalPages={images.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductGallery;