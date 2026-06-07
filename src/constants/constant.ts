export const STATUS_CODES = {
  SUCCESS: "success",
  CREATED: "created",
  BAD_REQUEST: "bad_request",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  INTERNAL_SERVER_ERROR: "internal_server_error",
} as const;

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/product",
  CART: "/cart",
};
export const FORMIK_REGEX = {
  RESTRICT_HTML_TAGS: /^[^<>]*$/
}
