# Business Analytics Dashboard

A full-stack web application for analyzing approximately 300,000 business transaction records through an interactive analytics dashboard.


## Overview

The source dataset contains one row per line item. A single order can therefore span multiple rows and is identified using `BillNo`.

Each record contains information such as:

- Order identifier
- Outlet and brand
- Order date and time
- Product category
- Individual item
- Price
- Quantity
- Order type
- Settlement/payment information

The dashboard converts this raw transactional data into business-level metrics and visualizations that can be filtered interactively.

## Key Features

### Dashboard KPIs

The dashboard provides:

- Total Revenue
- Total Orders
- Total Items Sold
- Average Order Value
- Total Records

### Visualizations

The dashboard currently includes:

- Daily Revenue Trend
- Revenue by Outlet
- Revenue by Product Category
- Revenue by Order Type
- Top-Selling Items

### Filtering

Users can filter the dashboard using:

- Date range
- Outlet
- Product category
- Order type

Filters can be combined, allowing users to analyze specific portions of the dataset.

For example:

> View delivery orders for a specific outlet and product category within a selected date range.

### User Interface

The dashboard uses a clean, responsive interface with:

- Sidebar navigation
- KPI cards
- Interactive charts
- Filter controls
- Ranked top-item visualization
- Responsive layouts for different screen sizes

## Architecture

The application follows a simple three-layer architecture:

```text
┌───────────────────────────────┐
│        React + Vite           │
│          Frontend             │
│                               │
│  Dashboard / Filters / Charts │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│           FastAPI             │
│           Backend             │
│                               │
│  API Routes / Filtering       │
│  Aggregation / Data Access    │
└───────────────┬───────────────┘
                │
                │ SQL
                ▼
┌───────────────────────────────┐
│        PostgreSQL             │
│                               │
│       Transaction Data        │
└───────────────────────────────┘
