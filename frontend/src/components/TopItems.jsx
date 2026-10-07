function TopItems({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="top-items-empty">
                No items found for the selected filters.
            </div>
        );
    }

    const maxQuantity = Math.max(
        ...data.map((item) => Number(item.quantity_sold) || 0)
    );

    return (
        <div className="top-items">

            {data.map((item, index) => {
                const quantity =
                    Number(item.quantity_sold) || 0;

                const percentage =
                    maxQuantity > 0
                        ? (quantity / maxQuantity) * 100
                        : 0;

                return (
                    <div
                        className="top-item"
                        key={item.item}
                    >

                        <div className="top-item-header">

                            <div className="top-item-name">

                                <span className="item-rank">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="item-name-text">
                                    {item.item}
                                </span>

                            </div>

                            <span className="item-quantity">
                                {quantity.toLocaleString("en-IN")}
                            </span>

                        </div>


                        <div className="item-bar">

                            <div
                                className="item-bar-fill"
                                style={{
                                    width: `${percentage}%`,
                                }}
                            />

                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default TopItems;