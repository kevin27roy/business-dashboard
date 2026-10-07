function FilterBar({
    filters,
    options,
    onChange,
    onReset,
}) {
    return (
        <section className="filter-bar">

            <div className="filter-heading">
                <span className="card-label">
                    FILTERS
                </span>

                <span className="filter-description">
                    Refine dashboard data
                </span>
            </div>


            <div className="filter-controls">

                {/* Start date */}

                <div className="filter-group">
                    <label>
                        From
                    </label>

                    <input
                        type="date"
                        min={options.date_range.earliest}
                        max={options.date_range.latest}
                        value={filters.startDate}
                        onChange={(e) =>
                            onChange(
                                "startDate",
                                e.target.value
                            )
                        }
                    />
                </div>


                {/* End date */}

                <div className="filter-group">
                    <label>
                        To
                    </label>

                    <input
                        type="date"
                        min={options.date_range.earliest}
                        max={options.date_range.latest}
                        value={filters.endDate}
                        onChange={(e) =>
                            onChange(
                                "endDate",
                                e.target.value
                            )
                        }
                    />
                </div>


                {/* Outlet */}

                <div className="filter-group">
                    <label>
                        Outlet
                    </label>

                    <select
                        value={filters.outlet}
                        onChange={(e) =>
                            onChange(
                                "outlet",
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All outlets
                        </option>

                        {options.outlets.map((outlet) => (
                            <option
                                key={outlet}
                                value={outlet}
                            >
                                {outlet}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Category */}

                <div className="filter-group">
                    <label>
                        Category
                    </label>

                    <select
                        value={filters.category}
                        onChange={(e) =>
                            onChange(
                                "category",
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All categories
                        </option>

                        {options.categories.map(
                            (category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            )
                        )}
                    </select>
                </div>


                {/* Order type */}

                <div className="filter-group">
                    <label>
                        Order Type
                    </label>

                    <select
                        value={filters.orderType}
                        onChange={(e) =>
                            onChange(
                                "orderType",
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All types
                        </option>

                        {options.order_types.map(
                            (type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            )
                        )}
                    </select>
                </div>


                <button
                    className="reset-filter"
                    onClick={onReset}
                >
                    Reset
                </button>

            </div>

        </section>
    );
}

export default FilterBar;