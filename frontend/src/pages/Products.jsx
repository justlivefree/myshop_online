import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../utils/api";
import useTranslation from "../utils/useTranslation";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = ({ category: categoryProp }) => {
  const { t } = useTranslation();
  const { category: categoryFromRoute } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const currentCategory = categoryProp || categoryFromRoute || "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(urlSearchQuery);

  const categoryTitle = currentCategory
    ? currentCategory === "mens"
      ? t.products.forMen
      : currentCategory === "womens"
        ? t.products.forWomen
        : t.products.allProducts
    : t.products.allProducts;

  const categoryParam =
    currentCategory === "mens"
      ? "men"
      : currentCategory === "womens"
        ? "women"
        : "";

  useEffect(() => {
    setSearchQuery(urlSearchQuery);
    setDebouncedSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      setDebouncedSearchQuery(trimmedQuery);

      const nextParams = new URLSearchParams(window.location.search);

      if (trimmedQuery) {
        nextParams.set("search", trimmedQuery);
      } else {
        nextParams.delete("search");
      }

      setSearchParams(nextParams, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const params = {};

        if (categoryParam) {
          params.category = categoryParam;
        }

        if (debouncedSearchQuery) {
          params.search = debouncedSearchQuery;
        }

        const response = await fetchProducts(params);
        const data = response.data.data;

        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryParam, debouncedSearchQuery]);

  useEffect(() => {
    let filtered = [...products];

    if (showOnSaleOnly) {
      filtered = filtered.filter((product) => product.discount > 0);
    }

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, showOnSaleOnly]);

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1>{categoryTitle}</h1>
          <p>{t.products.subtitle}</p>
        </div>
      </div>

      <section className="products-section">
        <div className="container">
          <div className="products-controls">
            <div className="controls-left">
              <label className="search-control">
                <span>{t.products.searchLabel}</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t.products.searchPlaceholder}
                />
              </label>

              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={showOnSaleOnly}
                  onChange={(event) => setShowOnSaleOnly(event.target.checked)}
                />
                <span>{t.products.onSale}</span>
              </label>
            </div>

            <div className="controls-right">
              <label className="sort-control">
                <span>{t.products.sortBy}</span>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="featured">{t.products.sortFeatured}</option>
                  <option value="newest">{t.products.sortNewest}</option>
                  <option value="price-asc">{t.products.sortPriceAsc}</option>
                  <option value="price-desc">{t.products.sortPriceDesc}</option>
                </select>
              </label>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>
                {t.products.noProducts}
              </p>
            </div>
          )}

          <div className="results-count">
            <p>{filteredProducts.length} {t.products.found}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
