import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { SearchIcon } from "../../../assets/svgIcons/svgIcons";
import CommonButton from "../Button/CommonButton";
import FormControl from "../formik/FormControl";
import { GetProductsByCategory, GetAllProducts } from "../../../services/productApiService";
import { IProduct } from "../../../services/interface";
import { useCategories } from "../../../hooks/useCategories";
import { debounce } from "../../../utils/helper";
import "./Sidebar.scss";

interface SidebarProps {
    onCategoryChange?: (category: string[]) => void;
    onBrandChange?: (brand: string[]) => void;
    onPriceChange?: (min: number | null, max: number | null) => void;
    appliedMinPrice?: number | null;
    appliedMaxPrice?: number | null;
    initialCategory?: string[];
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = memo(({ onCategoryChange, onBrandChange, onPriceChange, appliedMinPrice, appliedMaxPrice, initialCategory, isOpen, onClose }: SidebarProps) => {
    const { categories } = useCategories();
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>(initialCategory || []);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sidebarFilter, setSidebarFilter] = useState("");

    // Use debounce for local filter search
    const debouncedFilter = useMemo(
        () => debounce((q: string) => setSidebarFilter(q), 300),
        []
    );

    const handleClearFilters = useCallback(() => {
        setSelectedCategory([]);
        setSelectedBrand([]);
        setMinPrice("");
        setMaxPrice("");
        setSidebarFilter("");
        onCategoryChange?.([]);
        onBrandChange?.([]);
        onPriceChange?.(null, null);
    }, [onCategoryChange, onBrandChange, onPriceChange]);

    const handleApplyPrice = useCallback(() => {
        const min = minPrice.trim() ? parseFloat(minPrice) : null;
        const max = maxPrice.trim() ? parseFloat(maxPrice) : null;

        if (min !== null && isNaN(min)) return;
        if (max !== null && isNaN(max)) return;

        onPriceChange?.(min, max);
    }, [minPrice, maxPrice, onPriceChange]);

    // Sync internal state when initialCategory changes (e.g. navigating from Home)
    useEffect(() => {
        if (initialCategory !== undefined) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    useEffect(() => {
        setMinPrice(appliedMinPrice != null ? String(appliedMinPrice) : "");
        setMaxPrice(appliedMaxPrice != null ? String(appliedMaxPrice) : "");
    }, [appliedMinPrice, appliedMaxPrice]);

    const loadBrands = useCallback(async () => {
        const params = { limit: 200 };
        const catToFetch = selectedCategory.length > 0 ? selectedCategory[0] : "";
        const res = catToFetch
            ? await GetProductsByCategory(catToFetch, params)
            : await GetAllProducts(params);

        if (res && 'products' in res) {
            const products: IProduct[] = res.products;
            const getAllBrandsList = products
                .map((p) => p.brand)
                .filter((b): b is string => !!b && b.trim() !== '');

            const uniqueBrands = Array.from(new Set(getAllBrandsList)).sort();
            setBrands(uniqueBrands);

            const filteredBrands = selectedBrand.filter(b => uniqueBrands.includes(b));
            if (filteredBrands.length !== selectedBrand.length) {
                setSelectedBrand(filteredBrands);
                onBrandChange?.(filteredBrands);
            }
        }
    }, [selectedCategory, selectedBrand, onBrandChange]);

    useEffect(() => {
        loadBrands();
    }, [loadBrands]);

    const handleCategoryClick = useCallback((slug: string) => {
        const isSelected = selectedCategory.includes(slug);
        const next = isSelected
            ? selectedCategory.filter(c => c !== slug)
            : [...selectedCategory, slug];
        setSelectedCategory(next);
        onCategoryChange?.(next);
    }, [selectedCategory, onCategoryChange]);

    const handleBrandClick = useCallback((brand: string) => {
        const isSelected = selectedBrand.includes(brand);
        const next = isSelected
            ? selectedBrand.filter(b => b !== brand)
            : [...selectedBrand, brand];
        setSelectedBrand(next);
        onBrandChange?.(next);
    }, [selectedBrand, onBrandChange]);

    const filteredCategories = useMemo(() => {
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(sidebarFilter.toLowerCase())
        );
    }, [categories, sidebarFilter]);

    const filteredBrandsList = useMemo(() => {
        return brands.filter(brand =>
            brand.toLowerCase().includes(sidebarFilter.toLowerCase())
        );
    }, [brands, sidebarFilter]);

    const categoryList = useMemo(() => filteredCategories.map((cat) => (
        <div
            key={cat.slug}
            className={`category-item${selectedCategory.includes(cat.slug) ? " active" : ""}`}
            onClick={() => handleCategoryClick(cat.slug)}
        >
            <FormControl
                control="checkbox"
                name={cat.slug}
                label={cat.name}
                checked={selectedCategory.includes(cat.slug)}
                onChange={() => handleCategoryClick(cat.slug)}
            />
        </div>
    )), [filteredCategories, selectedCategory, handleCategoryClick]);

    const brandList = useMemo(() => filteredBrandsList.map((brand) => (
        <div
            key={brand}
            className={`category-item${selectedBrand.includes(brand) ? " active" : ""}`}
            onClick={() => handleBrandClick(brand)}
        >
            <FormControl
                control="checkbox"
                name={`brand-${brand}`}
                label={brand}
                checked={selectedBrand.includes(brand)}
                onChange={() => handleBrandClick(brand)}
            />
        </div>
    )), [filteredBrandsList, selectedBrand, handleBrandClick]);

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header-mobile">
                <button className="close-btn" onClick={onClose}>×</button>
            </div>
            <div className="sidebar-search">
                <div className="search-wrapper">
                    <FormControl
                        control="input"
                        name="sidebarSearch"
                        placeholder="Search filters..."
                        leftIcon={<SearchIcon />}
                        onChange={(e: any) => debouncedFilter(e.target.value)}
                        onClear={() => {
                            setSidebarFilter("");
                            debouncedFilter("");
                        }}
                    />
                </div>
            </div>

            <div className="sidebar-section">
                <h4>Categories</h4>
                <div className="checkbox-list checkbox-list--scrollable">
                    {categoryList}
                </div>
            </div>

            <div className="sidebar-section">
                <h4>Price Range</h4>
                <div className="price-wrapper">
                    <FormControl
                        control="input"
                        name="minPrice"
                        placeholder="Min"
                        type="number"
                        value={minPrice}
                        onChange={(e: any) => setMinPrice(e.target.value)}
                        min={1}
                    />
                    <FormControl
                        control="input"
                        name="maxPrice"
                        placeholder="Max"
                        type="number"
                        value={maxPrice}
                        onChange={(e: any) => setMaxPrice(e.target.value)}
                        min={1}
                    />
                </div>
                <CommonButton
                    className="apply-btn"
                    label="Apply"
                    fullWidth
                    onClick={handleApplyPrice}
                    disabled={!minPrice.trim() && !maxPrice.trim()}
                />
            </div>

            <div className="sidebar-section">
                <h4>Brands {brands.length > 0 && <span style={{ fontWeight: 400, fontSize: 12, color: "#888" }}>({brands.length})</span>}</h4>
                <div className="checkbox-list checkbox-list--scrollable">
                    {brandList}
                </div>
            </div>

            <div className="sidebar-footer" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <CommonButton
                    variant="outline-danger"
                    label="Clear Filters"
                    fullWidth
                    onClick={handleClearFilters}
                    disabled={selectedCategory.length === 0 && selectedBrand.length === 0 && !minPrice && !maxPrice}
                />
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;