import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# -----------------------------
# Paths and environment
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENV_PATH = os.path.join(BASE_DIR, "backend", ".env")
CSV_PATH = os.path.join(BASE_DIR, "data", "data.csv")

load_dotenv(ENV_PATH)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL was not found in backend/.env")


# -----------------------------
# Load CSV
# -----------------------------

print("Loading CSV...")

df = pd.read_csv(CSV_PATH)

print(f"Loaded {len(df):,} rows")


# -----------------------------
# Validate columns
# -----------------------------

required_columns = [
    "BillNo",
    "Outlet_Name",
    "Order_Datetime",
    "Group",
    "Order_Type",
    "Item",
    "Price",
    "Quantity",
    "Settlement",
    "Brand"
]

missing_columns = set(required_columns) - set(df.columns)

if missing_columns:
    raise ValueError(
        f"Missing columns: {missing_columns}"
    )

print("Column validation successful.")


# -----------------------------
# Clean data
# -----------------------------

print("Cleaning data...")

df["Order_Datetime"] = pd.to_datetime(
    df["Order_Datetime"],
    format="mixed"
)

df["Price"] = pd.to_numeric(df["Price"])
df["Quantity"] = pd.to_numeric(df["Quantity"])


# -----------------------------
# Derived fields
# -----------------------------

df["Revenue"] = df["Price"] * df["Quantity"]

df["Order_Date"] = df["Order_Datetime"].dt.date

df["Order_Hour"] = df["Order_Datetime"].dt.hour

df["Day_Of_Week"] = (
    df["Order_Datetime"]
    .dt.day_name()
)

df["Month"] = (
    df["Order_Datetime"]
    .dt.to_period("M")
    .astype(str)
)

print("Data transformation complete.")


# -----------------------------
# PostgreSQL connection
# -----------------------------

print("Connecting to PostgreSQL...")

engine = create_engine(DATABASE_URL)


# -----------------------------
# Load into PostgreSQL
# -----------------------------

print("Loading data into PostgreSQL...")

df.to_sql(
    "orders",
    engine,
    if_exists="replace",
    index=False,
    chunksize=3000,
    method="multi"
)

print("Data successfully loaded.")


# -----------------------------
# Create indexes
# -----------------------------

print("Creating indexes...")

with engine.begin() as connection:

    connection.execute(text("""
        CREATE INDEX IF NOT EXISTS idx_orders_datetime
        ON orders ("Order_Datetime")
    """))

    connection.execute(text("""
        CREATE INDEX IF NOT EXISTS idx_orders_billno
        ON orders ("BillNo")
    """))

    connection.execute(text("""
        CREATE INDEX IF NOT EXISTS idx_orders_outlet
        ON orders ("Outlet_Name")
    """))

    connection.execute(text("""
        CREATE INDEX IF NOT EXISTS idx_orders_group
        ON orders ("Group")
    """))

    connection.execute(text("""
        CREATE INDEX IF NOT EXISTS idx_orders_order_type
        ON orders ("Order_Type")
    """))


print("Indexes created.")

print("\nETL COMPLETED SUCCESSFULLY.")