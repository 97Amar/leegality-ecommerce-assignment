import { useState, useMemo, memo, useEffect } from "react";
import { CartIcon, HomeIcon, MenuIcon, SearchIcon, UserIcon } from "../../../assets/svgIcons/svgIcons";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import FormControl from "../formik/FormControl";
import CommonSelector from "../Selector/CommonSelector";
import { debounce } from "../../../utils/helper";
import { ROUTES } from "../../../constants/constant";
import "./Navbar.scss";

interface NavbarProps {
    searchValue?: string;
    onSearch?: (q: string) => void;
    onSortChange?: (sortBy: string, order: string) => void;
    onToggleSidebar?: () => void;
}

const Navbar = memo(({ searchValue, onSearch, onSortChange, onToggleSidebar }: NavbarProps) => {
    const { totalCount } = useCart();
    const [search, setSearch] = useState(searchValue || "");
    const [sortBy, setSortBy] = useState("title");
    const [order, setOrder] = useState("asc");

    // Use debounce instead of throttle for search
    const debouncedSearch = useMemo(
        () => debounce((q: string) => onSearch?.(q), 500),
        [onSearch]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value.trim());
    };

    const handleClearSearch = () => {
        setSearch("");
        onSearch?.("");
    };

    const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortBy(value);
        onSortChange?.(value, order);
    };

    const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setOrder(value);
        onSortChange?.(sortBy, value);
    };
    useEffect(() => {
        setSearch(searchValue || "");
    }, [searchValue]);
    return (
        <nav className="navbar">
            <span className="navbar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
                <MenuIcon />
            </span>

            <Link to={ROUTES.HOME} className="home-link" title="Go to Home">
                <HomeIcon />
            </Link>

            <div className="navbar-search">
                <div className="search-wrapper">
                    <FormControl
                        control="input"
                        name="search"
                        value={search}
                        placeholder="Search products..."
                        leftIcon={<SearchIcon />}
                        onChange={handleSearchChange}
                        onClear={handleClearSearch}
                    />
                </div>
            </div>

            {onSortChange && (
                <div className="navbar-sort">
                    <CommonSelector
                        value={sortBy}
                        onChange={handleSortByChange}
                        options={[
                            { label: "Title", value: "title" },
                            { label: "Price", value: "price" },
                            { label: "Rating", value: "rating" },
                            { label: "Stock", value: "stock" },
                        ]}
                    />
                    <CommonSelector
                        value={order}
                        onChange={handleOrderChange}
                        options={[
                            { label: "Asc", value: "asc" },
                            { label: "Desc", value: "desc" },
                        ]}
                    />
                </div>
            )}

            <div className="navbar-right">
                <Link to={ROUTES.CART} className="cart-btn">
                    <CartIcon />
                    {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
                </Link>
                <UserIcon />
            </div>
        </nav>
    );
});

export default Navbar;