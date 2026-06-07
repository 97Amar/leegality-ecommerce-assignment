import React, { useEffect, useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { GetProductsByCategory } from "../../../services/productApiService";
import { IProduct } from "../../../services/interface";
import ProductCard from "../../common/ProductCard/ProductCard";
import CategoryCircle from "../../common/CategoryCircle/CategoryCircle";
import { ROUTES } from "../../../constants/constant";
import "./Home.scss";

// Top categories for the circles row
const TOP_CATEGORIES = [
    { slug: "mobiles", name: "Mobile", apiSlug: "smartphones" },
    { slug: "cosmetics", name: "Cosmetics", apiSlug: "beauty" },
    { slug: "electronics", name: "Electronics", apiSlug: "laptops" },
    { slug: "furniture", name: "Furniture", apiSlug: "furniture" },
    { slug: "watches", name: "Watches", apiSlug: "mens-watches" },
    { slug: "decor", name: "Decor", apiSlug: "home-decoration" },
    { slug: "accessories", name: "Accessories", apiSlug: "sunglasses" },
];

const DEALS_LIMIT = 5;

const Home = memo(() => {
    const navigate = useNavigate();
    const [smartphoneDeals, setSmartphoneDeals] = useState<IProduct[]>([]);
    const [categoryThumbnails, setCategoryThumbnails] = useState<Record<string, string>>({});
    const [dealsLoading, setDealsLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
            setDealsLoading(true);
            try {
                const smartRes = await GetProductsByCategory("smartphones", { limit: DEALS_LIMIT });
                if (smartRes && 'products' in smartRes) {
                    setSmartphoneDeals(smartRes.products);
                }

                const thumbMap: Record<string, string> = {};
                await Promise.all(
                    TOP_CATEGORIES.map(async (cat) => {
                        const res = await GetProductsByCategory(cat.apiSlug, { limit: 1 });
                        if (res && 'products' in res && res.products.length > 0) {
                            thumbMap[cat.slug] = res.products[0].thumbnail;
                        }
                    })
                );
                setCategoryThumbnails(thumbMap);
            } catch (err) {
                console.error("Failed to load home data", err);
            } finally {
                setDealsLoading(false);
            }
        };

        loadHomeData();
    }, []);

    const handleSearch = useCallback((q: string) => {
        navigate(ROUTES.PRODUCTS, { state: { searchQuery: q } });
    }, [navigate]);

    const goToProductsByCategory = useCallback((apiSlug: string) => {
        navigate(ROUTES.PRODUCTS, { state: { category: apiSlug } });
    }, [navigate]);

    return (
        <MainLayout onSearch={handleSearch}>
            <div className="home-container">
                <div className="home-content">

                    {/* Section 1: Smartphone Deals */}
                    <section className="section deals-section">
                        <div className="section-header">
                            <h2>
                                Grab the best deal on{" "}
                                <span className="highlight">Smartphones</span>
                            </h2>
                            <Link to={ROUTES.PRODUCTS} className="view-all">
                                View All &gt;
                            </Link>
                        </div>

                        <div className="deals-grid">
                            {dealsLoading ? (
                                Array.from({ length: DEALS_LIMIT }).map((_, i) => (
                                    <ProductCard key={i} loading={true} />
                                ))
                            ) : (
                                smartphoneDeals.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                        </div>
                    </section>

                    {/* Section 2: Top Categories */}
                    <section className="section categories-section">
                        <div className="section-header">
                            <h2>
                                Shop From{" "}
                                <span className="highlight">Top Categories</span>
                            </h2>
                        </div>

                        <div className="categories-row">
                            {TOP_CATEGORIES.map((cat) => (
                                <CategoryCircle
                                    key={cat.slug}
                                    name={cat.name}
                                    image={categoryThumbnails[cat.slug] || ""}
                                    onClick={() => goToProductsByCategory(cat.apiSlug)}
                                />
                            ))}
                        </div>
                    </section>

                </div>
                {dealsLoading && (
                    <div className="home-blur-loader">
                        <div className="loader-content">
                            <div className="spinner"></div>
                            <p>Finding the best products just for you...</p>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
});

Home.displayName = "Home";

export default Home;
