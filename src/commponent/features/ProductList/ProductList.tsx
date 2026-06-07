import React, { useCallback, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../common/ProductCard/ProductCard";
import MainLayout from "../../../layouts/MainLayout";
import { useProducts } from "../../../hooks/useProducts";
import CustomPagination from "../../common/CustomPagination/CustomPagination";
import NoData from "../../common/NoData/NoData";
import "./ProductList.scss";

const LIMIT = 8;

const ProductList = memo(() => {
  const location = useLocation();
  const navCategory = (location.state as { category?: string })?.category;
  const initialCategoryArray = navCategory ? [navCategory] : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState((location.state as any)?.searchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string[]>(initialCategoryArray);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (navCategory) {
      setSelectedCategory([navCategory]);
    }
  }, [navCategory]);

  const { productList, loading, totalPages } = useProducts({
    searchQuery,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page: currentPage,
    limit: LIMIT,
  });

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((categories: string[]) => {
    setSelectedCategory(categories);
    setCurrentPage(1);
  }, []);

  const handleBrandChange = useCallback((brands: string[]) => {
    setSelectedBrand(brands);
    setCurrentPage(1);
  }, []);

  const handlePriceChange = useCallback((min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((by: string, order: string) => {
    setSortBy(by);
    setSortOrder(order);
    setCurrentPage(1);
  }, []);

  const renderProducts = () => {
    if (loading) {
      return <>{Array.from({ length: LIMIT }).map((_, i) => <ProductCard key={i} loading={true} />)}</>;
    }
    if (productList.length === 0) {
      return (
        <div className="no-data-wrapper">
          <NoData
            onReset={() => {
              setSearchQuery("");
              setSelectedCategory([]);
              setSelectedBrand([]);
              setMinPrice(null);
              setMaxPrice(null);
            }}
          />
        </div>
      );
    }
    return productList?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <MainLayout
      onSearch={handleSearch}
      searchValue={searchQuery}
      onCategoryChange={handleCategoryChange}
      onBrandChange={handleBrandChange}
      onPriceChange={handlePriceChange}
      appliedMinPrice={minPrice}
      appliedMaxPrice={maxPrice}
      onSortChange={handleSortChange}
      initialCategory={selectedCategory}
    >
      <div className="products-container">
        <div className="products-page">
          {renderProducts()}
        </div>

        {productList.length > 0 && <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalPages / LIMIT)}
          onPageChange={setCurrentPage}
        />}
      </div>
    </MainLayout>
  );
});

ProductList.displayName = "ProductList";

export default ProductList;