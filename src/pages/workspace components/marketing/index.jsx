import React, { useState, useEffect, useCallback } from "react";
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
import axios from "axios";

export const Marketing = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchMarketingData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://192.168.1.61:5000/api/marketing/analytics", {
                headers: getAuthHeader()
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching marketing data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMarketingData();
    }, [fetchMarketingData]);

    if (loading) {
        return <div className={styles.loading}>Loading marketing data...</div>;
    }

    if (!data) {
        return <div className={styles.error}>Failed to load marketing data.</div>;
    }

    const { kpis, trendData, campaigns, funnelData, channels } = data;

    return (
        <div className={styles.marketingPage}>

            <h1 className={styles.pageTitle}>Marketing Analysis</h1>

            {/* KPI CARDS */}
            <div className={styles.kpiGrid}>
                <div className={`${styles.kpiCard} ${styles.blue}`}>
                    <h4>Total Campaigns</h4>
                    <h2>{kpis.totalCampaigns.value}</h2>
                    <span>{kpis.totalCampaigns.growth} growth</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.green}`}>
                    <h4>Leads Generated</h4>
                    <h2>{kpis.leadsGenerated.value.toLocaleString()}</h2>
                    <span>{kpis.leadsGenerated.growth} this month</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.orange}`}>
                    <h4>Conversion Rate</h4>
                    <h2>{kpis.conversionRate.value}%</h2>
                    <span>{kpis.conversionRate.growth}</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.pink}`}>
                    <h4>Total Revenue</h4>
                    <h2>₹{kpis.totalRevenue.value.toLocaleString()}</h2>
                    <span>{kpis.totalRevenue.growth}</span>
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
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#64748b' }}
                            />
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
                        <div className={styles.funnelIndicator}>
                            <div className={styles.arrowLine}></div>
                            <ArrowDown size={14} className={styles.arrowHead} />
                        </div>

                        <div className={styles.funnelStages}>
                            {funnelData.map((stage, idx) => (
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
                {channels.map((chan, idx) => (
                    <div key={idx} className={styles.channelBox}>
                        <div className={styles.channelLabel}>
                            {chan.name === "Email" && <Mail size={18} color="#0ea5e9" />}
                            {chan.name === "WhatsApp" && <MessageCircle size={18} color="#10b981" />}
                            {chan.name === "Social" && <Share2 size={18} color="#f9a8d4" />}
                            {" "}{chan.name}
                        </div>
                        <div className={styles.channelStatsGrid}>
                            <div className={styles.channelStat}><span>Camp:</span> {chan.campaigns}</div>
                            <div className={styles.channelStat}><span>Leads:</span> {chan.leads}</div>
                            <div className={styles.channelStat}><span>Conv:</span> {chan.conversion}</div>
                            <div className={styles.channelStat}><span>Rev:</span> {chan.revenue}</div>
                        </div>
                    </div>
                ))}
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
                        {campaigns.map((c, index) => (
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
