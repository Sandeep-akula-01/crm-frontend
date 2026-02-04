import React, { useEffect, useState } from "react";
import axios from "axios";
import Leads from "../leads";
import Deals from "../deals";
import Tasks from "../tasks";
import Reports from "../reports";
import Contacts from "../main contacts";
import styles from "./main.module.css";
import Calendar from "../calendar";



export default function Main({ active, branch }) {

    const [summary, setSummary] = useState({});
    const [revenueData, setRevenueData] = useState({ total: "₹0", chart: [] });
    const [todayTasks, setTodayTasks] = useState([]);

    useEffect(() => {
        if (active === "Dashboard") {
            const fetchDashboard = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const headers = { Authorization: `Bearer ${token}` };
                    const BASE_URL = "http://192.168.1.19:5000";

                    const [resSummary, resRevenue, resTasks] = await Promise.all([
                        axios.get(`${BASE_URL}/api/dashboard/summary`, { headers }),
                        axios.get(`${BASE_URL}/api/dashboard/revenue-growth`, { headers }),
                        axios.get(`${BASE_URL}/api/reminders/today`, { headers })
                    ]);

                    setSummary(resSummary.data || {});

                    // Process Revenue Data
                    const backendRevenue = Array.isArray(resRevenue.data) ? resRevenue.data : [];
                    const totalVal = backendRevenue.reduce((acc, item) => acc + (Number(item.revenue) || 0), 0);

                    // Map to 12 months
                    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const maxVal = Math.max(...backendRevenue.map(d => Number(d.revenue) || 0), 1);

                    const chartBars = allMonths.map(monthName => {
                        const found = backendRevenue.find(d => d.month === monthName);
                        const val = found ? (Number(found.revenue) || 0) : 0;
                        return (val / maxVal) * 100;
                    });

                    setRevenueData({
                        total: `₹${totalVal.toLocaleString()}`,
                        chart: chartBars
                    });

                    setTodayTasks(resTasks.data || []);
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                }
            };
            fetchDashboard();
        }
    }, [active]);




    switch (active) {
        case "Dashboard":
            return (
                <>
                    <h2 className={styles.sectionTitle}>Overview</h2>

                    <div className={styles.kpiGrid}>
                        <div className={`${styles.kpiCard} ${styles.kpiLeads}`}>
                            <span className={styles.kpiTitle}>Total Leads</span>
                            <strong className={styles.kpiValue}>{summary.total_leads || 0}</strong>
                            <span className={styles.kpiSub}>{summary.leads_growth || "0%"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiDeals}`}>
                            <span className={styles.kpiTitle}>Active Deals</span>
                            <strong className={styles.kpiValue}>{summary.active_deals || 0}</strong>
                            <span className={styles.kpiSub}>{summary.deals_progress || "0 in progress"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiRevenue}`}>
                            <span className={styles.kpiTitle}>Revenue</span>
                            <strong className={styles.kpiValue}>{summary.revenue || "₹0"}</strong>
                            <span className={styles.kpiSub}>{summary.revenue_period || "This period"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiTasks}`}>
                            <span className={styles.kpiTitle}>Tasks Due</span>
                            <strong className={styles.kpiValue}>{summary.tasks_due || 0}</strong>
                            <span className={styles.kpiSub}>{summary.tasks_overdue || "0 overdue"}</span>
                        </div>
                    </div>


                    {/* quick Actions  

                    <div className={styles.quickWrap}>
                        <span className={styles.quickLabel}>Quick Actions</span>

                        <div className={styles.quickGrid}>
                            <button className={`${styles.quickCard} ${styles.qaLead}`}>
                                + Add Lead
                            </button>

                            <button className={`${styles.quickCard} ${styles.qaTask}`}>
                                Create Task
                            </button>

                            <button className={`${styles.quickCard} ${styles.qaCall}`}>
                                Log Call
                            </button>

                            <button className={`${styles.quickCard} ${styles.qaContact}`}>
                                Add Contact
                            </button>
                        </div>
                    </div> */}



                    {/* CHARTS SECTION */}

                    {/* GROWTH & TODAY SECTION */}
                    <section className={styles.growthSection}>
                        <div className={styles.growthHeader}>
                            <h2>Business Overview</h2>
                            <p>Your growth and today’s priorities at a glance</p>
                        </div>

                        <div className={styles.growthGrid}>
                            {/* Revenue Card */}
                            <div className={styles.revenueCard}>
                                <div className={styles.revenueTop}>
                                    <div>
                                        <h3>Revenue Growth</h3>
                                        <span>Last 12 Months</span>
                                    </div>
                                    <strong className={styles.revenueValue}>{revenueData.total || "₹0"}</strong>
                                </div>

                                <div className={styles.revenueChart}>
                                    {(revenueData.chart || []).map((h, i) => (
                                        <div key={i} className={styles.revenueBarWrap}>
                                            <div
                                                className={styles.revenueBar}
                                                style={{ height: `${h}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.monthRow}>
                                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                                        .map((m, i) => <span key={`${m}-${i}`}>{m}</span>)}
                                </div>
                            </div>

                            {/* Today Card */}
                            <div className={styles.todayCard}>
                                <div className={styles.todayHeader}>
                                    <h3>Today</h3>
                                    <span>Tue, 16 Jan</span>
                                </div>

                                <div className={styles.todayList}>
                                    {todayTasks.length === 0 && <p style={{ padding: '10px', color: '#888', fontSize: '0.9rem' }}>No tasks for today</p>}
                                    {todayTasks.map((task, i) => (
                                        <div key={i} className={`${styles.todayItem} ${styles[task.type?.toLowerCase()] || styles.work}`}>
                                            <span className={styles.dot}></span>
                                            <span className={styles.time}>{task.time}</span>
                                            <p>{task.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>




                    {/* Mini Cards 
                            <div className={styles.miniInsights}>
                                <div className={styles.miniCard}>
                                    <h4>Lead Conversion</h4>
                                    <strong>32%</strong>
                                    <span>Up from last month</span>
                                </div>

                                <div className={styles.miniCardAlt}>
                                    <h4>Active Deals</h4>
                                    <strong>128</strong>
                                    <span>23 in closing stage</span>
                                </div>
                            </div> */}




                </>
            );


            {/* ------------   Leads   ---------------- */ }



        case "Leads":
            return (
                <>
                    <Leads branch={branch} />
                </>
            );


        case "Deals":
            return <Deals branch={branch} />;

        case "Tasks":
            return <Tasks branch={branch} />;

        case "Contacts":
            return <Contacts branch={branch} />;

        case "Reports":
            return <Reports branch={branch} />;

        case "Calendar":
            return <Calendar branch={branch} />;

        default:
            return null;
    }
}
