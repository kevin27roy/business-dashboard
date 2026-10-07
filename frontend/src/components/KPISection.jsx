function KPISection({ summary }) {
    const cards = [
        {
            title: "Total Revenue",
            value: `₹${(summary.total_revenue / 1000000).toFixed(2)}M`,
        },
        {
            title: "Total Orders",
            value: summary.total_orders.toLocaleString(),
        },
        {
            title: "Items Sold",
            value: summary.total_items.toLocaleString(),
        },
        {
            title: "Average Order Value",
            value: `₹${summary.average_order_value.toFixed(2)}`,
        },
    ];

    return (
        <section className="kpi-grid">
            {cards.map((card) => (
                <div className="kpi-card" key={card.title}>
                    <p>{card.title}</p>

                    <h2>{card.value}</h2>

                    <span className="kpi-indicator">
                        Overview
                    </span>
                </div>
            ))}
        </section>
    );
}

export default KPISection;