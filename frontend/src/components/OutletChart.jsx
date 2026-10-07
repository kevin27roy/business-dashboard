import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

function OutletChart({ data }) {
    const totalRevenue = data.reduce(
        (sum, item) => sum + Number(item.revenue || 0),
        0
    );

    const formatRevenue = (value) => {
        return `₹${Number(value).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
    };

    return (
        <div className="outlet-chart">

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 75,
                        left: 5,
                        bottom: 5,
                    }}
                    barCategoryGap="28%"
                >
                    <CartesianGrid
                        horizontal={false}
                        stroke="#D8E4EA"
                    />

                    <XAxis
                        type="number"
                        hide
                    />

                    <YAxis
                        type="category"
                        dataKey="outlet"
                        axisLine={false}
                        tickLine={false}
                        width={95}
                        tick={{
                            fill: "#627587",
                            fontSize: 10,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            formatRevenue(value),
                            "Revenue",
                        ]}
                        contentStyle={{
                            background: "#F5F9FC",
                            border: "1px solid #D2E0E8",
                            borderRadius: "12px",
                            boxShadow:
                                "0 10px 25px rgba(48, 70, 90, 0.10)",
                        }}
                    />

                    <Bar
                        dataKey="revenue"
                        radius={[
                            0,
                            8,
                            8,
                            0,
                        ]}
                        maxBarSize={22}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    index === 0
                                        ? "#17213D"
                                        : "#6E8FA6"
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>


            <div className="outlet-values">

                {data.map((item) => {

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
                            className="outlet-value-row"
                            key={item.outlet}
                        >

                            <span className="outlet-value-name">
                                {item.outlet}
                            </span>

                            <span className="outlet-value-revenue">
                                {formatRevenue(revenue)}
                            </span>

                            <span className="outlet-value-percent">
                                {percentage}%
                            </span>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default OutletChart;