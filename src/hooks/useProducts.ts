import { useState, useCallback, useEffect } from 'react';
import { GetAllProducts, SearchProducts, GetProductsByCategory } from '../services/productApiService';
import { IProduct, IProductListResponse } from '../services/interface';

interface ProductFilters {
    searchQuery?: string;
    selectedCategory?: string[];
    selectedBrand?: string[];
    minPrice?: number | null;
    maxPrice?: number | null;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
}

const filterByBrand = (products: IProduct[], selectedBrand: string[]) => {
    if (selectedBrand.length === 0) return products;
    return products.filter(p =>
        p.brand && selectedBrand.some(b => b.toLowerCase() === p.brand?.toLowerCase())
    );
};

const filterByPrice = (products: IProduct[], minPrice: number | null, maxPrice: number | null) => {
    if (minPrice == null && maxPrice == null) return products;
    return products.filter(p => {
        if (minPrice != null && p.price < minPrice) return false;
        if (maxPrice != null && p.price > maxPrice) return false;
        return true;
    });
};

const paginateProducts = (products: IProduct[], page: number, limit: number): IProductListResponse => {
    const start = (page - 1) * limit;
    return {
        products: products.slice(start, start + limit),
        total: products.length,
        skip: start,
        limit,
    };
};

export const useProducts = (filters: ProductFilters) => {
    const [productList, setProductList] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const {
        searchQuery = '',
        selectedCategory = [],
        selectedBrand = [],
        minPrice = null,
        maxPrice = null,
        sortBy = '',
        sortOrder = 'asc',
        page = 1,
        limit = 10,
    } = filters;

    const hasPriceFilter = minPrice != null || maxPrice != null;

    const applyFilters = useCallback((products: IProduct[]) => {
        let filtered = filterByBrand(products, selectedBrand);
        filtered = filterByPrice(filtered, minPrice, maxPrice);
        return filtered;
    }, [selectedBrand, minPrice, maxPrice]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let res: IProductListResponse | [] | null = null;
            const params = { page, limit };

            if (searchQuery.trim()) {
                const fetchLimit = hasPriceFilter ? 200 : limit;
                const fetchPage = hasPriceFilter ? 1 : page;
                res = await SearchProducts({ page: fetchPage, limit: fetchLimit, q: searchQuery.trim() });
                if (res && 'products' in res) {
                    const filtered = applyFilters(res.products);
                    res = hasPriceFilter
                        ? paginateProducts(filtered, page, limit)
                        : { ...res, products: filtered, total: filtered.length };
                }
            } else if (selectedCategory.length > 0) {
                // Fetch products for all selected categories
                const results = await Promise.all(
                    selectedCategory.map(cat => GetProductsByCategory(cat, { page: 1, limit: 100 }))
                );

                let allProducts: IProduct[] = [];
                results.forEach(r => {
                    if (r && 'products' in r) {
                        allProducts = [...allProducts, ...r.products];
                    }
                });

                // Deduplicate
                const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());

                const filteredProducts = applyFilters(uniqueProducts);

                // Pagination
                res = paginateProducts(filteredProducts, page, limit);
            } else if (selectedBrand.length > 0 || hasPriceFilter) {
                const allRes = await GetAllProducts({ page: 1, limit: 200 });
                if (allRes && 'products' in allRes) {
                    const filtered = applyFilters(allRes.products);
                    res = paginateProducts(filtered, page, limit);
                }
            } else {
                res = await GetAllProducts({
                    ...params,
                    sortBy: sortBy || undefined,
                    order: sortBy ? sortOrder : undefined,
                });
            }

            if (res && 'products' in res) {
                setProductList(res.products);
                setTotalPages(res.total);
            } else {
                setProductList([]);
                setTotalPages(0);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch products');
            setProductList([]);
        } finally {
            setLoading(false);
        }
    }, [page, limit, searchQuery, selectedCategory, selectedBrand, minPrice, maxPrice, sortBy, sortOrder, hasPriceFilter, applyFilters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { productList, loading, totalPages, error, refresh: fetchProducts };
};
