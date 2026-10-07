import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function RevenueChart({ data }) {
    const formatRevenue = (value) => {
        if (value >= 1000000) {
            return `₹${(value / 1000000).toFixed(1)}M`;
        }

        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(0)}K`;
        }

        return `₹${value}`;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="#6E8FA6"
                            stopOpacity={0.28}
                        />
                        <stop
                            offset="100%"
                            stopColor="#6E8FA6"
                            stopOpacity={0.02}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    stroke="#D2E0E8"
                    strokeDasharray="3 3"
                    vertical={false}
                />

                <XAxis
                    dataKey="date"
                    tick={{ fill: "#82909A", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={35}
                    tickFormatter={(value) =>
                        new Date(value).toLocaleDateString(
                            "en-IN",
                            {
                                month: "short",
                                year: "2-digit",
                            }
                        )
                    }
                />

                <YAxis
                    tick={{ fill: "#82909A", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatRevenue}
                />

                <Tooltip
                    contentStyle={{
                        background: "rgba(245, 249, 252, 0.96)",
                        border: "1px solid #D2E0E8",
                        borderRadius: "12px",
                        boxShadow:
                            "0 10px 25px rgba(48, 70, 90, 0.10)",
                    }}
                    labelStyle={{
                        color: "#53616D",
                        fontSize: 12,
                    }}
                    formatter={(value) => [
                        `₹${Number(value).toLocaleString("en-IN")}`,
                        "Revenue",
                    ]}
                />

                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#17213D"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    dot={false}
                    activeDot={{
                        r: 5,
                        fill: "#17213D",
                        stroke: "#F5F9FC",
                        strokeWidth: 3,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default RevenueChart;