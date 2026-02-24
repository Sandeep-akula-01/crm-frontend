import React, { useEffect, useState } from "react";
import axios from "axios";
import Leads from "../leads";
import Deals from "../deals";
import Tasks from "../tasks";
import Reports from "../reports";
import Contacts from "../main contacts";
import styles from "./main.module.css";
import Calendar from "../calendar";



import Analytics from "../analytics";
import Pipelines from "../pipelines";
import Insights from "../insights/Insights";

import {
    PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { PieChart as PieIcon, ListChecks, CheckCircle2, UserPlus, Calendar as CalIcon } from "lucide-react";
import CustomerMap from "./CustomerMap";

export default function Main({ active, branch, setActive }) {

    const DUMMY_SUMMARY = {
        total_leads: 128,
        leads_growth: "+14% from last month",
        active_deals: 32,
        deals_progress: "12 in closing stage",
        revenue: "₹42,50,000",
        revenue_period: "Annual Forecast",
        tasks_due: 14,
        tasks_overdue: "3 overdue"
    };

    const DUMMY_REVENUE = [
        { month: "Jan", revenue: 250000 },
        { month: "Feb", revenue: 320000 },
        { month: "Mar", revenue: 280000 },
        { month: "Apr", revenue: 450000 },
        { month: "May", revenue: 520000 },
        { month: "Jun", revenue: 480000 },
        { month: "Jul", revenue: 610000 },
        { month: "Aug", revenue: 580000 },
        { month: "Sep", revenue: 720000 },
        { month: "Oct", revenue: 680000 },
        { month: "Nov", revenue: 850000 },
        { month: "Dec", revenue: 920000 }
    ];

    const processRevenue = (data) => {
        const totalVal = data.reduce((acc, item) => acc + (Number(item.revenue) || 0), 0);
        const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const maxVal = Math.max(...data.map(d => Number(d.revenue) || 0), 1);
        const chart = allMonths.map(monthName => {
            const found = data.find(d => d.month === monthName);
            const val = found ? (Number(found.revenue) || 0) : 0;
            return (val / maxVal) * 100;
        });
        return { total: `₹${totalVal.toLocaleString()}`, chart };
    };

    const [summary, setSummary] = useState(DUMMY_SUMMARY);
    const [revenueData, setRevenueData] = useState(processRevenue(DUMMY_REVENUE));
    const [todayTasks, setTodayTasks] = useState([
        { type: "Meeting", time: "09:00 AM", title: "Morning Briefing - Sales Team" },
        { type: "Meeting", time: "10:00 AM", title: "Strategy Session with Global Tech" },
        { type: "Call", time: "11:30 AM", title: "Follow up with Wayne Corp" },
        { type: "Task", time: "01:00 PM", title: "Update Pipeline Report" },
        { type: "Task", time: "02:00 PM", title: "Review Q1 Financial Report" }
    ]);
    const [mapView, setMapView] = useState("world");

    useEffect(() => {
        if (active === "Dashboard") {
            const fetchDashboard = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const headers = { Authorization: `Bearer ${token}` };
                    const BASE_URL = "http://192.168.1.61:5000";

                    const [resSummary, resRevenue, resTasks] = await Promise.all([
                        axios.get(`${BASE_URL}/api/dashboard/summary`, { headers }).catch(() => ({ data: null })),
                        axios.get(`${BASE_URL}/api/dashboard/revenue-growth`, { headers }).catch(() => ({ data: null })),
                        axios.get(`${BASE_URL}/api/reminders/today`, { headers }).catch(() => ({ data: null }))
                    ]);

                    if (resSummary?.data) {
                        setSummary(resSummary.data);
                    }

                    if (Array.isArray(resRevenue?.data) && resRevenue.data.length > 0) {
                        setRevenueData(processRevenue(resRevenue.data));
                    }

                    if (Array.isArray(resTasks?.data) && resTasks.data.length > 0) {
                        setTodayTasks(resTasks.data.slice(0, 5));
                    }
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                }
            };
            fetchDashboard();
        }
    }, [active]);

    // --- 3rd Row Dummy Data ---
    const leadStatusData = [
        { name: "New", value: 45, color: "#6b5cff", grad: "pieGrad1" },
        { name: "Contacted", value: 30, color: "#3bbfa0", grad: "pieGrad2" },
        { name: "Qualified", value: 15, color: "#ffc56e", grad: "pieGrad3" },
        { name: "Closed", value: 10, color: "#ff8fa3", grad: "pieGrad4" },
    ];

    const recentActivities = [
        { id: 1, type: "deal", title: "Deal Closed", desc: "Premium plan for 'Tech Sol'", time: "2h ago", icon: <CheckCircle2 size={14} />, color: "#3bbfa0" },
        { id: 2, type: "lead", title: "Lead Assigned", desc: "Rahul assigned to 'Amit K.'", time: "4h ago", icon: <UserPlus size={14} />, color: "#6b5cff" },
        { id: 3, type: "task", title: "Task Completed", desc: "Follow up call with Rohan", time: "1d ago", icon: <ListChecks size={14} />, color: "#ffc56e" },
        { id: 4, type: "meeting", title: "Meeting Scheduled", desc: "Demo with 'Blue Corp'", time: "1d ago", icon: <CalIcon size={14} />, color: "#ff8fa3" },
    ];




    switch (active) {
        case "Dashboard":
            return (
                <>
                    <h2 className={styles.sectionTitle}>Overview</h2>

                    <div className={styles.kpiGrid}>
                        <div className={`${styles.kpiCard} ${styles.kpiLeads}`} onClick={() => setActive("Leads")}>
                            <span className={styles.kpiTitle}>Total Leads</span>
                            <strong className={styles.kpiValue}>{summary.total_leads || 0}</strong>
                            <span className={styles.kpiSub}>{summary.leads_growth || "0%"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiDeals}`} onClick={() => setActive("Deals")}>
                            <span className={styles.kpiTitle}>Active Deals</span>
                            <strong className={styles.kpiValue}>{summary.active_deals || 0}</strong>
                            <span className={styles.kpiSub}>{summary.deals_progress || "0 in progress"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiRevenue}`} onClick={() => setActive("Reports")}>
                            <span className={styles.kpiTitle}>Revenue</span>
                            <strong className={styles.kpiValue}>{summary.revenue || "₹0"}</strong>
                            <span className={styles.kpiSub}>{summary.revenue_period || "This period"}</span>
                        </div>

                        <div className={`${styles.kpiCard} ${styles.kpiTasks}`} onClick={() => setActive("Tasks")}>
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

                    {/* 3RD ROW: MAP, PIE, TIMELINE */}
                    <section className={styles.statsRow}>
                        {/* Map Card — replaced with react-simple-maps vector map */}
                        <CustomerMap />

                        {/* Pie Card */}
                        <div className={styles.pieCard}>
                            <div className={styles.cardHeader}>
                                <h3><PieIcon size={18} /> Leads by Status</h3>
                            </div>
                            <div className={styles.pieContainer}>
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="pieGrad1" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#8c81ff" />
                                                <stop offset="100%" stopColor="#6b5cff" />
                                            </linearGradient>
                                            <linearGradient id="pieGrad2" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#62e0c2" />
                                                <stop offset="100%" stopColor="#3bbfa0" />
                                            </linearGradient>
                                            <linearGradient id="pieGrad3" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ffd89d" />
                                                <stop offset="100%" stopColor="#ffc56e" />
                                            </linearGradient>
                                            <linearGradient id="pieGrad4" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#ffb3c1" />
                                                <stop offset="100%" stopColor="#ff8fa3" />
                                            </linearGradient>
                                        </defs>
                                        <Pie
                                            data={leadStatusData}
                                            innerRadius={60}
                                            outerRadius={85}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {leadStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={`url(#${entry.grad})`} />
                                            ))}
                                        </Pie>
                                        <ReTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className={styles.pieLegend}>
                                    {leadStatusData.map((d, i) => (
                                        <div key={i} className={styles.legendItem}>
                                            <span style={{ background: d.color }}></span>
                                            <label>{d.name}</label>
                                            <strong>{d.value}%</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Timeline Card */}
                        <div className={styles.timelineCard}>
                            <div className={styles.cardHeader}>
                                <h3><ListChecks size={18} /> Recent Activities</h3>
                            </div>
                            <div className={styles.timelineList}>
                                {recentActivities.map((act) => (
                                    <div key={act.id} className={styles.timelineItem}>
                                        <div className={styles.timelineIcon} style={{ background: `${act.color}20`, color: act.color }}>
                                            {act.icon}
                                        </div>
                                        <div className={styles.timelineContent}>
                                            <div className={styles.timelineTop}>
                                                <strong>{act.title}</strong>
                                                <span>{act.time}</span>
                                            </div>
                                            <p>{act.desc}</p>
                                        </div>
                                    </div>
                                ))}
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
        case "Analytics":
        case "Pipelines":
            return <Insights active={active} branch={branch} setActive={setActive} />;

        case "Calendar":
            return <Calendar branch={branch} />;

        default:
            return null;
    }
}
