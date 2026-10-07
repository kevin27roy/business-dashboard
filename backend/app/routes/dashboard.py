from typing import Optional

from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine
from app.routes.filters import build_filters


router = APIRouter()


# =========================================================
# SUMMARY
# =========================================================

@router.get("/summary")
def dashboard_summary(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            COUNT(*) AS total_records,
            COUNT(DISTINCT "BillNo") AS total_orders,
            SUM("Quantity") AS total_items,
            SUM("Revenue") AS total_revenue
        FROM orders
        {where_clause}
    """)

    with engine.connect() as connection:
        result = connection.execute(query, params).mappings().one()

    total_revenue = float(result["total_revenue"] or 0)
    total_orders = int(result["total_orders"] or 0)
    total_items = int(result["total_items"] or 0)

    return {
        "total_records": int(result["total_records"] or 0),
        "total_orders": total_orders,
        "total_items": total_items,
        "total_revenue": total_revenue,
        "average_order_value": (
            total_revenue / total_orders
            if total_orders
            else 0
        ),
    }


# =========================================================
# REVENUE TREND
# =========================================================

@router.get("/revenue-trend")
def revenue_trend(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            "Order_Date" AS date,
            SUM("Revenue") AS revenue
        FROM orders
        {where_clause}
        GROUP BY "Order_Date"
        ORDER BY "Order_Date"
    """)

    with engine.connect() as connection:
        results = connection.execute(query, params).mappings().all()

    return [
        {
            "date": str(row["date"]),
            "revenue": float(row["revenue"] or 0),
        }
        for row in results
    ]


# =========================================================
# OUTLET REVENUE
# =========================================================

@router.get("/outlets")
def outlet_revenue(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            "Outlet_Name" AS outlet,
            SUM("Revenue") AS revenue
        FROM orders
        {where_clause}
        GROUP BY "Outlet_Name"
        ORDER BY revenue DESC
    """)

    with engine.connect() as connection:
        results = connection.execute(query, params).mappings().all()

    return [
        {
            "outlet": row["outlet"],
            "revenue": float(row["revenue"] or 0),
        }
        for row in results
    ]


# =========================================================
# CATEGORY REVENUE
# =========================================================

@router.get("/categories")
def category_revenue(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            "Group" AS category,
            SUM("Revenue") AS revenue
        FROM orders
        {where_clause}
        GROUP BY "Group"
        ORDER BY revenue DESC
    """)

    with engine.connect() as connection:
        results = connection.execute(query, params).mappings().all()

    return [
        {
            "category": row["category"],
            "revenue": float(row["revenue"] or 0),
        }
        for row in results
    ]


# =========================================================
# ORDER TYPE REVENUE
# =========================================================

@router.get("/order-types")
def order_type_revenue(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            "Order_Type" AS order_type,
            SUM("Revenue") AS revenue
        FROM orders
        {where_clause}
        GROUP BY "Order_Type"
        ORDER BY revenue DESC
    """)

    with engine.connect() as connection:
        results = connection.execute(query, params).mappings().all()

    return [
        {
            "order_type": row["order_type"],
            "revenue": float(row["revenue"] or 0),
        }
        for row in results
    ]


# =========================================================
# TOP SELLING ITEMS
# =========================================================

@router.get("/top-items")
def top_items(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    where_clause, params = build_filters(
        start_date,
        end_date,
        outlet,
        category,
        order_type,
    )

    query = text(f"""
        SELECT
            "Item" AS item,
            SUM("Quantity") AS quantity_sold,
            SUM("Revenue") AS revenue
        FROM orders
        {where_clause}
        GROUP BY "Item"
        ORDER BY quantity_sold DESC
        LIMIT 10
    """)

    with engine.connect() as connection:
        results = connection.execute(query, params).mappings().all()

    return [
        {
            "item": row["item"],
            "quantity_sold": int(row["quantity_sold"] or 0),
            "revenue": float(row["revenue"] or 0),
        }
        for row in results
    ]


# =========================================================
# FILTER OPTIONS
# =========================================================

@router.get("/filter-options")
def filter_options():

    queries = {
        "outlets": """
            SELECT DISTINCT "Outlet_Name"
            FROM orders
            ORDER BY "Outlet_Name"
        """,

        "categories": """
            SELECT DISTINCT "Group"
            FROM orders
            ORDER BY "Group"
        """,

        "order_types": """
            SELECT DISTINCT "Order_Type"
            FROM orders
            ORDER BY "Order_Type"
        """,

        "date_range": """
            SELECT
                MIN("Order_Date") AS earliest_date,
                MAX("Order_Date") AS latest_date
            FROM orders
        """,
    }

    with engine.connect() as connection:

        outlets = connection.execute(
            text(queries["outlets"])
        ).scalars().all()

        categories = connection.execute(
            text(queries["categories"])
        ).scalars().all()

        order_types = connection.execute(
            text(queries["order_types"])
        ).scalars().all()

        date_range = connection.execute(
            text(queries["date_range"])
        ).mappings().one()

    return {
        "outlets": list(outlets),
        "categories": list(categories),
        "order_types": list(order_types),
        "date_range": {
            "earliest": str(date_range["earliest_date"]),
            "latest": str(date_range["latest_date"]),
        },
    }