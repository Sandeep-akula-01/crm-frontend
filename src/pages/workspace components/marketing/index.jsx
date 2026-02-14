import React from "react";
import {
    ArrowUpRight,
    ArrowRight,
    ArrowDown,
    Mail,
    MessageCircle,
    Share2
} from "lucide-react";
import styles from "./marketing.module.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const trendData = [
    { month: "Jan", leads: 45, revenue: 40000 },
    { month: "Feb", leads: 180, revenue: 65000 },
    { month: "Mar", leads: 95, revenue: 52000 },
    { month: "Apr", leads: 280, revenue: 90000 },
    { month: "May", leads: 150, revenue: 120000 },
    { month: "Jun", leads: 310, revenue: 85000 },
    { month: "Jul", leads: 220, revenue: 140000 },
];

const campaignsArray = [
    {
        name: "New Year Blast",
        channel: "Email",
        status: "Active",
        leads: 210,
        conversion: "6.2%",
        revenue: "₹65,000",
        date: "Jan 12, 2026",
    },
    {
        name: "Instagram Reel Push",
        channel: "Social",
        status: "Scheduled",
        leads: 120,
        conversion: "4.1%",
        revenue: "₹32,000",
        date: "Feb 02, 2026",
    },
];

export const Marketing = () => {
    return (
        <div className={styles.marketingPage}>

            <h1 className={styles.pageTitle}>Marketing Analysis</h1>

            {/* KPI CARDS */}
            <div className={styles.kpiGrid}>
                <div className={`${styles.kpiCard} ${styles.blue}`}>
                    <h4>Total Campaigns</h4>
                    <h2>24</h2>
                    <span>+12% growth</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.green}`}>
                    <h4>Leads Generated</h4>
                    <h2>1,240</h2>
                    <span>+8% this month</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.orange}`}>
                    <h4>Conversion Rate</h4>
                    <h2>5.3%</h2>
                    <span>+1.2%</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.pink}`}>
                    <h4>Total Revenue</h4>
                    <h2>₹1,25,000</h2>
                    <span>+18%</span>
                </div>
            </div>

            {/* GRAPH + FUNNEL */}
            <div className={styles.middleSection}>

                {/* LINE GRAPH */}
                <div className={styles.chartCard}>
                    <h3>Leads & Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300} style={{ marginTop: "30px" }}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            {/* Left Y-Axis for Leads */}
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
                            {/* Right Y-Axis for Revenue (Hidden to keep UI clean) */}
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                hide={true}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="leads"
                                stroke="#0ea5e9"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                                animationDuration={1500}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                                animationDuration={1800}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* FUNNEL */}
                <div className={styles.funnelCardWide}>
                    <div className={styles.funnelHeader}>
                        <h3>Sales Funnel</h3>
                        <div className={styles.funnelLegend}>
                            <span>Flow</span>
                            <span>Conversion</span>
                        </div>
                    </div>
                    <div className={styles.salesFunnelContainer}>
                        {/* Downward Arrow on Left */}
                        <div className={styles.funnelIndicator}>
                            <div className={styles.arrowLine}></div>
                            <ArrowDown size={14} className={styles.arrowHead} />
                        </div>

                        {/* Funnel Content */}
                        <div className={styles.funnelStages}>
                            {[
                                { label: "Lead", value: "100%", color: "#60a5fa", width: "100%" },
                                { label: "Market Qualified", value: "55%", color: "#c084fc", width: "85%" },
                                { label: "Sales Qualified", value: "27%", color: "#4ade80", width: "70%" },
                                { label: "Negotiated", value: "16%", color: "#fbbf24", width: "55%" },
                                { label: "Customer", value: "10%", color: "#f472b6", width: "40%" },
                                { label: "Renewed", value: "3%", color: "#818cf8", width: "30%" },
                            ].map((stage, idx) => (
                                <div key={idx} className={styles.funnelRow}>
                                    <div
                                        className={styles.funnelBar}
                                        style={{
                                            backgroundColor: stage.color,
                                            width: stage.width,
                                            boxShadow: `0 4px 12px ${stage.color}40`
                                        }}
                                    >
                                        <span className={styles.stageLabel}>{stage.label}</span>
                                    </div>
                                    <div className={styles.funnelPercentageTrack}>
                                        <div className={styles.ghostBar}></div>
                                        <span className={styles.percentageValue}>{stage.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 📈 SECTION 3 — Channel Comparison */}
            <div className={styles.channelSection}>
                <div className={styles.channelBox}>
                    <div className={styles.channelLabel}>
                        <Mail size={18} color="#0ea5e9" /> Email
                    </div>
                    <div className={styles.channelStatsGrid}>
                        <div className={styles.channelStat}><span>Camp:</span> 10</div>
                        <div className={styles.channelStat}><span>Leads:</span> 480</div>
                        <div className={styles.channelStat}><span>Conv:</span> 6.1%</div>
                        <div className={styles.channelStat}><span>Rev:</span> ₹70k</div>
                    </div>
                </div>

                <div className={styles.channelBox}>
                    <div className={styles.channelLabel}>
                        <MessageCircle size={18} color="#10b981" /> WhatsApp
                    </div>
                    <div className={styles.channelStatsGrid}>
                        <div className={styles.channelStat}><span>Camp:</span> 8</div>
                        <div className={styles.channelStat}><span>Leads:</span> 390</div>
                        <div className={styles.channelStat}><span>Conv:</span> 5.8%</div>
                        <div className={styles.channelStat}><span>Rev:</span> ₹42k</div>
                    </div>
                </div>

                <div className={styles.channelBox}>
                    <div className={styles.channelLabel}>
                        <Share2 size={18} color="#f9a8d4" /> Social
                    </div>
                    <div className={styles.channelStatsGrid}>
                        <div className={styles.channelStat}><span>Camp:</span> 6</div>
                        <div className={styles.channelStat}><span>Leads:</span> 370</div>
                        <div className={styles.channelStat}><span>Conv:</span> 4.3%</div>
                        <div className={styles.channelStat}><span>Rev:</span> ₹33k</div>
                    </div>
                </div>
            </div>

            {/* PERFORMANCE TABLE */}
            <div className={styles.tableCard}>
                <h3>Campaign Performance</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Channel</th>
                            <th>Status</th>
                            <th>Leads</th>
                            <th>Conversion</th>
                            <th>Revenue</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignsArray.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.channel}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[c.status.toLowerCase()]}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td>{c.leads}</td>
                                <td>{c.conversion}</td>
                                <td>{c.revenue}</td>
                                <td>{c.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
