import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Briefcase,
  Zap,
  ChevronRight,
  Download,
  Target,
  UserCircle,
  CheckCircle,
  Globe
} from "lucide-react";
import styles from "./reports.module.css";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("summary");

  const insightsData = [
    { text: "Leads from Google Ads have increased by 22% this month.", type: "short" },
    { text: "Conversion rate is highest for referrals at 35% across all regions.", type: "short" },
    { text: "Performance Update: The organic channel is showing declining engagement; consider re-allocating budget to LinkedIn campaigns for B2B segments.", type: "long" },
    { text: "Best Performer: Ravi Teja has closed ₹18.5L in revenue this month.", type: "short" }
  ];

  const tabs = [
    { id: "summary", label: "Executive Summary", icon: <Zap size={16} /> },
    { id: "leads", label: "Lead Report", icon: <Globe size={16} /> },
    { id: "sales", label: "Sales Report", icon: <Target size={16} /> },
    { id: "pipeline", label: "Pipeline Report", icon: <TrendingUp size={16} /> },
    { id: "reps", label: "Sales Reps", icon: <UserCircle size={16} /> },
    { id: "customers", label: "Customer Stats", icon: <Users size={16} /> },
  ];

  // High fidelity mock data
  const summaryData = {
    revenue: "₹42,50,000", leads: 1284, conversion: "18.5%", performer: "Ravi Teja",
    growth: "+12.4%", best_source: "Google Ads"
  };

  const leadReport = [
    { source: "Google Ads", leads: 450, location: "Hyderabad", growth: "+15%" },
    { source: "LinkedIn", leads: 380, location: "Bangalore", growth: "+10%" },
    { source: "Referrals", leads: 220, location: "Mumbai", growth: "+25%" },
    { source: "Organic", leads: 84, location: "Delhi", growth: "-5%" },
  ];

  const salesReport = [
    { item: "Revenue Breakdown", value: "₹42,50,000", change: "+12%" },
    { item: "Won Deals", value: "32", change: "+8%" },
    { item: "Lost Deals", value: "16", change: "-2%" },
    { item: "Avg Deal Size", value: "₹1,32,000", change: "+5%" },
  ];

  const topDeals = [
    { client: "Tech Corp", value: "₹5,00,000", rep: "Ravi", status: "Won" },
    { client: "Soft Systems", value: "₹3,20,000", rep: "Ravi", status: "Won" },
    { client: "Green Sol", value: "₹2,80,000", rep: "Anu", status: "Negotiation" },
  ];

  const pipelineStats = [
    { stage: "New Lead", deals: 45, value: "₹12,40,000", closedIn: "12 days" },
    { stage: "Qualified", deals: 32, value: "₹25,00,000", closedIn: "18 days" },
    { stage: "Proposal", deals: 18, value: "₹45,20,000", closedIn: "24 days" },
    { stage: "Stagnant", deals: 8, value: "₹5,00,000", closedIn: "45+ days" },
  ];

  const repLeaderboard = [
    { name: "Ravi Teja", closed: 14, revenue: "₹18,50,000", conv: "28%", target: "120%" },
    { name: "Anu S", closed: 10, revenue: "₹12,20,000", conv: "22%", target: "95%" },
    { name: "Varshini K", closed: 8, revenue: "₹11,80,000", conv: "24%", target: "105%" },
  ];

  const customerStats = [
    { label: "New Customers", value: "124", color: "#6b5cff" },
    { label: "Repeat Customers", value: "88", color: "#3bbfa0" },
    { label: "Retention Rate", value: "72%", color: "#f59e0b" },
    { label: "Churn Rate", value: "4.5%", color: "#ef4444" },
  ];

  return (
    <div className={styles.reportsPage}>

      {/* KPI CARDS */}
      <div className={styles.reportStats}>
        <div className={`${styles.statCard} ${styles.kpiLeads}`}>
          <span><Users size={16} /> Total Leads</span>
          <b>{summaryData.leads}</b>
        </div>
        <div className={`${styles.statCard} ${styles.kpiConversion}`}>
          <span><TrendingUp size={16} /> Conversion Rate</span>
          <b>{summaryData.conversion}</b>
        </div>
        <div className={`${styles.statCard} ${styles.kpiRevenue}`}>
          <span><DollarSign size={16} /> Revenue</span>
          <b>{summaryData.revenue}</b>
        </div>
        <div className={`${styles.statCard} ${styles.kpiDeals}`}>
          <span><Briefcase size={16} /> Active Deals</span>
          <b>48</b>
        </div>
      </div>

      {/* SMART INSIGHTS GRID */}
      <div className={styles.insightsRow}>
        <div className={styles.insightsRowHeader}>
          <h3><Zap size={18} color="#6b5cff" /> Smart Insights</h3>
        </div>
        <div className={styles.insightsGrid}>
          {insightsData.map((insight, i) => (
            <div key={i} className={`${styles.insightCard} ${insight.type === 'long' ? styles.fullWidthInsight : ''}`}>
              <ChevronRight size={16} color="#6b5cff" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{insight.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TABBED ANALYTICS SECTION */}
      <div className={styles.tabbedContainer}>
        <div className={styles.tabSidebar}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabLink} ${activeTab === tab.id ? styles.activeTabLink : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "summary" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Executive Summary</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <div className={styles.summaryGrid}>
                <div className={`${styles.summaryBox} ${styles.summaryRevenue}`}>
                  <span>Total Revenue</span>
                  <h4>{summaryData.revenue}</h4>
                  <small className={styles.positive}>{summaryData.growth} growth</small>
                </div>
                <div className={`${styles.summaryBox} ${styles.summaryLeads}`}>
                  <span>Total Leads</span>
                  <h4>{summaryData.leads}</h4>
                  <small>New this month</small>
                </div>
                <div className={`${styles.summaryBox} ${styles.summaryConv}`}>
                  <span>Goal Achievement</span>
                  <h4>{summaryData.conversion}</h4>
                  <small className={styles.positive}>Best: Referrals (35%)</small>
                </div>
                <div className={`${styles.summaryBox} ${styles.summaryPerf}`}>
                  <span>Top Performer</span>
                  <h4>{summaryData.performer}</h4>
                  <small>{summaryData.best_source} (Best Source)</small>
                </div>
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Lead Report</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <table className={styles.reportTable}>
                <thead>
                  <tr><th>Source</th><th>Leads</th><th>Location</th><th>Growth</th></tr>
                </thead>
                <tbody>
                  {leadReport.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.bold}>{row.source}</td>
                      <td>{row.leads}</td>
                      <td>{row.location}</td>
                      <td className={row.growth.startsWith('+') ? styles.positive : styles.negative}>{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "sales" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Sales Performance</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <table className={styles.reportTable}>
                <thead><tr><th>Metric</th><th>Value</th><th>Trend</th></tr></thead>
                <tbody>
                  {salesReport.map((row, i) => (
                    <tr key={i}>
                      <td>{row.item}</td>
                      <td className={styles.bold}>{row.value}</td>
                      <td className={row.change.startsWith('+') ? styles.positive : styles.negative}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className={styles.subTitle}>Top Winning Deals</h4>
              <table className={styles.reportTable}>
                <tbody>
                  {topDeals.map((deal, i) => (
                    <tr key={i}>
                      <td>{deal.client}</td>
                      <td className={styles.bold}>{deal.value}</td>
                      <td className={styles.muted}>{deal.rep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Pipeline Overview</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <table className={styles.reportTable}>
                <thead><tr><th>Stage</th><th>Deals</th><th>Value</th><th>Avg Time</th></tr></thead>
                <tbody>
                  {pipelineStats.map((row, i) => (
                    <tr key={i}>
                      <td>{row.stage}</td>
                      <td>{row.deals}</td>
                      <td className={styles.bold}>{row.value}</td>
                      <td className={styles.muted}>{row.closedIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reps" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Sales Rep Performance</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <table className={styles.reportTable}>
                <thead><tr><th>Rep</th><th>Won</th><th>Revenue</th><th>Target</th></tr></thead>
                <tbody>
                  {repLeaderboard.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.bold}>{row.name}</td>
                      <td>{row.closed}</td>
                      <td className={styles.accentText}>{row.revenue}</td>
                      <td>
                        <div className={styles.targetProgress}>
                          <div className={styles.progressFill} style={{ width: Math.min(parseInt(row.target), 100) + '%' }} />
                          <span>{row.target}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "customers" && (
            <div className={styles.contentBlock}>
              <div className={styles.contentHeader}>
                <h3 className={styles.contentTitle}>Customer Analytics</h3>
                <Download size={16} className={styles.exportIcon} />
              </div>
              <div className={styles.customerGrid}>
                {customerStats.map((stat, i) => (
                  <div key={i} className={styles.customerExecCard}>
                    <span style={{ color: stat.color }}>{stat.label}</span>
                    <h4 style={{ color: stat.color }}>{stat.value}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
