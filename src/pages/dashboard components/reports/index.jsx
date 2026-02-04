import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./Reports.module.css";

export default function Reports() {

  const [summary, setSummary] = useState({
    total_leads: 0,
    conversion_rate: "0%",
    revenue: "₹0",
    active_deals: 0
  });
  const [trendData, setTrendData] = useState([]);
  const [sources, setSources] = useState([]);
  const [insights, setInsights] = useState([]);

  const [mounted, setMounted] = useState(false);

  // 👈 hook 1
  useEffect(() => {
    setMounted(true);
  }, []);

  // 👈 hook 2 (ALWAYS runs now)
  useEffect(() => {
    if (!mounted) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const BASE_URL = "http://192.168.1.19:5000";

        const [resSummary, resTrend, resSources, resInsights] =
          await Promise.all([
            axios.get(`${BASE_URL}/api/reports/summary`, { headers }),
            axios.get(`${BASE_URL}/api/reports/leads-trend`, { headers }),
            axios.get(`${BASE_URL}/api/reports/lead-sources`, { headers }),
            axios.get(`${BASE_URL}/api/reports/insights`, { headers })
          ]);

        setSummary(resSummary.data || {});
        setTrendData(resTrend.data || []);


        setSources(
          (resSources.data || []).map(item => ({
            name: item.source || "Direct",
            value: item.leads
          }))
        );

        setInsights(resInsights.data || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchData();
  }, [mounted]);





  return (
    <div className={styles.reportsPage}>

      {/* KPI CARDS */}
      <div className={styles.reportStats}>
        <div className={styles.statCard}>
          <span>Total Leads</span>
          <b>{summary.total_leads}</b>
        </div>
        <div className={styles.statCard}>
          <span>Conversion Rate</span>
          <b>{summary.conversion_rate}</b>
        </div>
        <div className={styles.statCard}>
          <span>Revenue</span>
          <b>{summary.revenue}</b>
        </div>
        <div className={styles.statCard}>
          <span>Active Deals</span>
          <b>{summary.active_deals}</b>
        </div>
      </div>

      {/* CHARTS */}
      <div className={styles.chartsRow}>

        {/* LEADS TREND */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Leads Trend</h3>
            <span>Last 6 Months</span>
          </div>

          <div className={styles.trendGraph}>
            {mounted && trendData.length > 0 && (
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={trendData}>
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#6b5cff"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className={styles.months}>
            {trendData.map((item, index) => (
              <span key={index}>{item.month}</span>
            ))}
          </div>
        </div>

        {/* SOURCES */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Lead Sources</h3>
            <span>Top Channels</span>
          </div>

          <div className={styles.sourcesList}>
            {sources.map((source, i) => (
              <div key={i}>
                <span className={styles.dot} />
                {source.name}
                <b>{source.value}</b>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INSIGHTS */}
      <div className={styles.insights}>
        <h3>Insights</h3>

        <ul>
          {insights.map((insight, i) => (
            <li key={i}>
              {typeof insight === 'string' ? insight : insight.text}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
