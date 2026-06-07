import { API_URLS } from "../constants/url";
import { apiCallGet } from "./axios";
import { ICategory, IProduct, IProductListResponse } from "./interface";

// DummyJSON uses `skip` not `page`, so convert here
const toSkip = (page = 1, limit = 10) => (page - 1) * limit;

export const GetAllProducts = async (params?: { page?: number; limit?: number; sortBy?: string; order?: string }): Promise<IProductListResponse | []> => {
    try {
        const { page, limit = 10, ...rest } = params || {};
        const res: any = await apiCallGet(API_URLS.GET_ALL_PRODUCTS, {
            params: { limit, skip: toSkip(page, limit), ...rest }
        });
        if (res && res?.products?.length > 0) {
            return res as IProductListResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const SearchProducts = async (params?: { q?: string; page?: number; limit?: number }): Promise<IProductListResponse | []> => {
    try {
        const { page, limit = 10, ...rest } = params || {};
        const res: any = await apiCallGet(API_URLS.SEARCH_PRODUCTS, {
            params: { limit, skip: toSkip(page, limit), ...rest }
        });
        if (res && res?.products?.length > 0) {
            return res as IProductListResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const GetProductsByCategory = async (category: string, params?: { page?: number; limit?: number }): Promise<IProductListResponse | []> => {
    try {
        const { page, limit = 10, ...rest } = params || {};
        const res: any = await apiCallGet(
            `${API_URLS.GET_PRODUCTS_BY_CATEGORY}/${category}`,
            { params: { limit, skip: toSkip(page, limit), ...rest } }
        );
        if (res && res?.products?.length > 0) {
            return res as IProductListResponse;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const GetCategories = async (): Promise<ICategory[]> => {
    try {
        const res: any = await apiCallGet(API_URLS.GET_ALL_CATEGORIES);
        return Array.isArray(res) ? (res as ICategory[]) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const GetCategoryList = async (): Promise<string[]> => {
    try {
        const res: any = await apiCallGet(API_URLS.GET_CATEGORY_LIST);
        return Array.isArray(res) ? (res as string[]) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const GetProductById = async (id: string): Promise<IProduct | null> => {
    try {
        const res: any = await apiCallGet(`${API_URLS.GET_PRODUCT_BY_ID}/${id}`);
        return res ? (res as IProduct) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};