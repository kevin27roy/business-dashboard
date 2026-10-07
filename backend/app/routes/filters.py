from typing import Optional

from sqlalchemy import text


def build_filters(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    outlet: Optional[str] = None,
    category: Optional[str] = None,
    order_type: Optional[str] = None,
):
    conditions = []
    params = {}

    if start_date:
        conditions.append('"Order_Date" >= :start_date')
        params["start_date"] = start_date

    if end_date:
        conditions.append('"Order_Date" <= :end_date')
        params["end_date"] = end_date

    if outlet:
        conditions.append('"Outlet_Name" = :outlet')
        params["outlet"] = outlet

    if category:
        conditions.append('"Group" = :category')
        params["category"] = category

    if order_type:
        conditions.append('"Order_Type" = :order_type')
        params["order_type"] = order_type

    where_clause = ""

    if conditions:
        where_clause = "WHERE " + " AND ".join(conditions)

    return where_clause, params