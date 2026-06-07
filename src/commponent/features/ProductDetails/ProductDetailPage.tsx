import { useEffect, useState, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProductById } from "../../../services/productApiService";
import { IProduct } from "../../../services/interface";
import ProductGallery from "./Components/ProductGallery";
import ProductInfo from "./Components/ProductInfo";
import ProductDescription from "./Components/ProductDescription";
import ProductReviews from "./Components/ProductReviews";
import ProductDetailSkeleton from "./skeleton/ProductDetailSkeleton";
import MainLayout from "../../../layouts/MainLayout";
import { useCart } from "../../../context/CartContext";
import { ROUTES } from "../../../constants/constant";
import "./ProductDetail.scss";
import CommonButton from "../../common/Button/CommonButton";
import { ArrowLeftIcon } from "../../../assets/svgIcons/svgIcons";

const ProductDetailPage = memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getProductById = useCallback(async () => {
        try {
            if (!id) return;
            const res = await GetProductById(id);
            if (res) {
                setIsLoading(false);
                setProduct(res);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        getProductById();
    }, [getProductById]);

    const handleSearch = useCallback((q: string) => {
        navigate(ROUTES.PRODUCTS, { state: { searchQuery: q } });
    }, [navigate]);

    if (isLoading) {
        return <ProductDetailSkeleton />;
    }

    if (!product) {
        return (
            <MainLayout onSearch={handleSearch}>
                <div style={{ padding: '80px', textAlign: 'center', fontSize: '20px', color: '#666' }}>
                    Product not found
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout onSearch={handleSearch}>
            <div className="product-detail-page">
                <CommonButton
                    className="back-btn"
                    icon={<ArrowLeftIcon />}
                    label="Back"
                    onClick={() => navigate(-1)}
                />
                <div className="product-layout">
                    <div className="left-panel">
                        <ProductGallery images={product?.images} />
                    </div>

                    <div className="right-panel">
                        <ProductInfo product={product} />

                        <div className="product-actions">
                            <button className="add-to-cart-big" onClick={() => addToCart(product)}>
                                Add to Cart
                            </button>
                        </div>

                        <hr className="product-divider" />

                        <ProductDescription
                            text={product.description}
                        />

                        <ProductReviews
                            reviews={product.reviews}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
});

ProductDetailPage.displayName = "ProductDetailPage";

export default ProductDetailPage;