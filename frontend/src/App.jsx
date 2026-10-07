import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Store,
    BarChart3,
} from "lucide-react";

import {
    getDashboardData,
    getFilterOptions,
} from "./services/api";

import KPISection from "./components/KPISection";
import FilterBar from "./components/FilterBar";
import RevenueChart from "./components/RevenueChart";
import OutletChart from "./components/OutletChart";
import CategoryChart from "./components/CategoryChart";
import OrderTypeChart from "./components/OrderTypeChart";
import TopItems from "./components/TopItems";

import "./App.css";


const defaultFilters = {
    startDate: "",
    endDate: "",
    outlet: "",
    category: "",
    orderType: "",
};


function App() {
    const [summary, setSummary] = useState(null);
    const [revenueTrend, setRevenueTrend] = useState([]);
    const [outlets, setOutlets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [topItems, setTopItems] = useState([]);

    const [filterOptions, setFilterOptions] = useState(null);

    const [filters, setFilters] = useState(defaultFilters);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    /*
     * Load filter options once.
     */

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const data = await getFilterOptions();

                setFilterOptions(data);

            } catch (err) {
                console.error(err);

                setError(
                    "Unable to load filter options."
                );
            }
        };

        loadOptions();
    }, []);


    /*
     * Load dashboard whenever filters change.
     */

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await getDashboardData(filters);

                setSummary(data.summary);
                setRevenueTrend(data.revenueTrend);
                setOutlets(data.outlets);
                setCategories(data.categories);
                setOrderTypes(data.orderTypes);
                setTopItems(data.topItems);

            } catch (err) {
                console.error(err);

                setError(
                    "Unable to load dashboard data."
                );

            } finally {
                setLoading(false);
            }
        };

        loadDashboard();

    }, [filters]);


    const handleFilterChange = (
        name,
        value
    ) => {
        setFilters((current) => ({
            ...current,
            [name]: value,
        }));
    };


    const resetFilters = () => {
        setFilters(defaultFilters);
    };


    if (!filterOptions) {
        return (
            <div className="loading-screen">
                <div className="loading-card">
                    <div className="loading-spinner"></div>

                    <p>
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="app-shell">

            {/* =========================
                SIDEBAR
               ========================= */}

            <aside className="sidebar">

                
                <nav className="sidebar-nav">

                    <button
                        className="nav-item active"
                        onClick={() =>
                            document.getElementById("overview")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        <LayoutDashboard className="nav-icon" />
                        <span>Overview</span>
                    </button>


                    <button
                        className="nav-item"
                        onClick={() =>
                            document.getElementById("sales")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        <ShoppingCart className="nav-icon" />
                        <span>Sales</span>
                    </button>


                    <button
                        className="nav-item"
                        onClick={() =>
                            document.getElementById("products")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        <Package className="nav-icon" />
                        <span>Products</span>
                    </button>


                    <button
                        className="nav-item"
                        onClick={() =>
                            document.getElementById("outlets")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        <Store className="nav-icon" />
                        <span>Outlets</span>
                    </button>

                </nav>


                <div className="sidebar-bottom">

                    <div className="status-dot"></div>

                    <span>
                        Live Data
                    </span>

                </div>

            </aside>


            {/* =========================
                MAIN CONTENT
               ========================= */}

            <main 
                className="main-content"
                id="overview"
            >

                <header className="topbar">

                    <div>

                        <p className="eyebrow">
                            SALES ANALYTICS
                        </p>

                        <h1>
                            Business Overview
                        </h1>

                        <p className="subtitle">
                            Monitor your sales performance
                            and business activity.
                        </p>

                    </div>


                    <div className="topbar-status">

                        <span className="status-dot"></span>

                        Live

                    </div>

                </header>


                {/* =========================
                    FILTERS
                   ========================= */}

                <FilterBar
                    filters={filters}
                    options={filterOptions}
                    onChange={handleFilterChange}
                    onReset={resetFilters}
                />


                {/* =========================
                    ERROR
                   ========================= */}

                {error && (
                    <div className="error-card">
                        {error}
                    </div>
                )}


                {/* =========================
                    LOADING
                   ========================= */}

                {loading && (
                    <div className="dashboard-loading">
                        Updating dashboard...
                    </div>
                )}


                {/* =========================
                    KPI CARDS
                   ========================= */}

                {summary && (
                    <KPISection
                        summary={summary}
                    />
                )}


                {/* =========================
                    REVENUE
                   ========================= */}

                <section 
                    className="dashboard-card revenue-card"
                    id="sales"
                >

                    <div className="card-header">

                        <div>

                            <p className="card-label">
                                PERFORMANCE
                            </p>

                            <h2>
                                Revenue Trend
                            </h2>

                        </div>

                        <span className="period-pill">
                            {filters.startDate ||
                                filterOptions.date_range
                                    .earliest}
                            {" – "}
                            {filters.endDate ||
                                filterOptions.date_range
                                    .latest}
                        </span>

                    </div>


                    <RevenueChart
                        data={revenueTrend}
                    />

                </section>


                {/* =========================
                    OUTLET + CATEGORY
                   ========================= */}

                <div className="dashboard-grid">

                    <section 
                        className="dashboard-card"
                        id="outlets"
                    >

                        <div className="card-header">

                            <div>

                                <p className="card-label">
                                    OUTLETS
                                </p>

                                <h2>
                                    Revenue by Outlet
                                </h2>

                            </div>

                        </div>


                        <OutletChart
                            data={outlets}
                        />

                    </section>


                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <p className="card-label">
                                    PRODUCTS
                                </p>

                                <h2>
                                    Revenue by Category
                                </h2>

                            </div>

                        </div>


                        <CategoryChart
                            data={categories}
                        />

                    </section>

                </div>


                {/* =========================
                    ORDER TYPE + TOP ITEMS
                   ========================= */}

                <div className="dashboard-grid second-row">

                    <section
                        className="dashboard-card"
                        id="products"
                    >

                        <div className="card-header">

                            <div>

                                <p className="card-label">
                                    ORDERS
                                </p>

                                <h2>
                                    Revenue by Order Type
                                </h2>

                            </div>

                        </div>


                        <OrderTypeChart
                            data={orderTypes}
                        />

                    </section>


                    <section className="dashboard-card">

                        <div className="card-header">

                            <div>

                                <p className="card-label">
                                    PRODUCTS
                                </p>

                                <h2>
                                    Top Selling Items
                                </h2>

                            </div>

                        </div>


                        <TopItems
                            data={topItems}
                        />

                    </section>

                </div>

            </main>

        </div>
    );
}


export default App;