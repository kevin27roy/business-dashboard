import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#17213D",
    "#6E8FA6",
    "#91A9B8",
    "#AFC5D2",
    "#718594",
    "#C4D5DE",
    "#D8E4EA",
];

function CategoryChart({ data }) {
    const totalRevenue = data.reduce(
        (sum, item) => sum + Number(item.revenue || 0),
        0
    );

    return (
        <div className="category-chart">

            <div className="category-chart-main">

                <ResponsiveContainer
                    width="100%"
                    height={250}
                >
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="revenue"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={62}
                            outerRadius={92}
                            paddingAngle={3}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        COLORS[
                                            index %
                                                COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value, name) => [
                                `₹${Number(
                                    value
                                ).toLocaleString(
                                    "en-IN"
                                )}`,
                                name,
                            ]}
                            contentStyle={{
                                background:
                                    "#F5F9FC",
                                border:
                                    "1px solid #D2E0E8",
                                borderRadius:
                                    "12px",
                                boxShadow:
                                    "0 10px 25px rgba(48, 70, 90, 0.10)",
                            }}
                        />

                    </PieChart>
                </ResponsiveContainer>

                <div className="category-center">
                    <span>Total</span>

                    <strong>
                        ₹
                        {totalRevenue.toLocaleString(
                            "en-IN",
                            {
                                maximumFractionDigits: 0,
                            }
                        )}
                    </strong>
                </div>

            </div>


            <div className="category-legend">

                {data.map((item, index) => {

                    const revenue =
                        Number(item.revenue) || 0;

                    const percentage =
                        totalRevenue > 0
                            ? (
                                  (revenue /
                                      totalRevenue) *
                                  100
                              ).toFixed(1)
                            : "0.0";

                    return (
                        <div
                            className="category-legend-item"
                            key={item.category}
                        >

                            <div className="category-legend-name">

                                <span
                                    className="category-dot"
                                    style={{
                                        backgroundColor:
                                            COLORS[
                                                index %
                                                    COLORS.length
                                            ],
                                    }}
                                />

                                <span>
                                    {item.category}
                                </span>

                            </div>


                            <div className="category-legend-value">

                                <span>
                                    ₹
                                    {revenue.toLocaleString(
                                        "en-IN",
                                        {
                                            maximumFractionDigits: 0,
                                        }
                                    )}
                                </span>

                                <small>
                                    {percentage}%
                                </small>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default CategoryChart;