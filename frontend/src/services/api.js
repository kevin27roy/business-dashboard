import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

export const getDashboardData = async (filters = {}) => {
    const params = {};

    if (filters.startDate) {
        params.start_date = filters.startDate;
    }

    if (filters.endDate) {
        params.end_date = filters.endDate;
    }

    if (filters.outlet) {
        params.outlet = filters.outlet;
    }

    if (filters.category) {
        params.category = filters.category;
    }

    if (filters.orderType) {
        params.order_type = filters.orderType;
    }

    const [
        summary,
        revenueTrend,
        outlets,
        categories,
        orderTypes,
        topItems,
    ] = await Promise.all([
        api.get("/dashboard/summary", { params }),
        api.get("/dashboard/revenue-trend", { params }),
        api.get("/dashboard/outlets", { params }),
        api.get("/dashboard/categories", { params }),
        api.get("/dashboard/order-types", { params }),
        api.get("/dashboard/top-items", { params }),
    ]);

    return {
        summary: summary.data,
        revenueTrend: revenueTrend.data,
        outlets: outlets.data,
        categories: categories.data,
        orderTypes: orderTypes.data,
        topItems: topItems.data,
    };
};

export const getFilterOptions = async () => {
    const response = await api.get("/dashboard/filter-options");

    return response.data;
};