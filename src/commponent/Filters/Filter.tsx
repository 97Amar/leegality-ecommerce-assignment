import "./Filters.css";

interface IProps{
    categories:any[],
    selectedCategory:string,
    setSelectedCategory:any,
    minPrice:string,
    setMinPrice:any,
    maxPrice:string,
    setMaxPrice:any,
    brands:string[],
    selectedBrand:string,
    setSelectedBrand:any,
}   

const Filters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brands,
  selectedBrand,
  setSelectedBrand,
}:any) => {
  return (
    <div className="filters">
      <h3>Filters</h3>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

        {categories.map((cat:any) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) =>
          setMinPrice(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(e.target.value)
        }
      />

      <select
        value={selectedBrand}
        onChange={(e) =>
          setSelectedBrand(e.target.value)
        }
      >
        <option value="">
          All Brands
        </option>

        {brands.map((brand:any) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;