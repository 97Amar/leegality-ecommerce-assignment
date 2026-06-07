import React, { useState } from "react";
import Navbar from "../commponent/common/Navbar/Navbar";
import Sidebar from "../commponent/common/Sidebar/Sidebar";
import "./MainLayout.scss";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  onSearch?: (q: string) => void;
  onSortChange?: (sortBy: string, order: string) => void;
  onCategoryChange?: (category: string[]) => void;
  onBrandChange?: (brand: string[]) => void;
  onPriceChange?: (min: number | null, max: number | null) => void;
  appliedMinPrice?: number | null;
  appliedMaxPrice?: number | null;
  initialCategory?: string[];
  searchValue?: string;
}

const MainLayout = ({
  children,
  onSearch,
  onSortChange,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  appliedMinPrice,
  appliedMaxPrice,
  initialCategory,
  searchValue,
}: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div className="main-layout">

      <Navbar
        onSearch={onSearch}
        onSortChange={onSortChange}
        onToggleSidebar={toggleSidebar}
        searchValue={searchValue}
      />

      <div className="main-layout-body">
        <Sidebar
          onCategoryChange={onCategoryChange}
          onBrandChange={onBrandChange}
          onPriceChange={onPriceChange}
          appliedMinPrice={appliedMinPrice}
          appliedMaxPrice={appliedMaxPrice}
          initialCategory={initialCategory}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="main-layout-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
