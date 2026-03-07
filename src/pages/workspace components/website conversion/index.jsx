import React, { useState } from "react";
import {
    Globe,
    Users,
    MousePointerClick,
    MonitorPlay,
    MessageSquare,
    FormInput,
    LayoutTemplate,
    Activity,
    ArrowUpRight
} from "lucide-react";
import styles from "./website-conversion.module.css";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const mockVisitorData = [
    { day: "Mon", visitors: 400, leads: 24, conversion: 6 },
    { day: "Tue", visitors: 300, leads: 13, conversion: 4.3 },
    { day: "Wed", visitors: 550, leads: 38, conversion: 6.9 },
    { day: "Thu", visitors: 450, leads: 29, conversion: 6.4 },
    { day: "Fri", visitors: 700, leads: 56, conversion: 8 },
    { day: "Sat", visitors: 200, leads: 8, conversion: 4 },
    { day: "Sun", visitors: 250, leads: 11, conversion: 4.4 },
];

const mockSubmissions = [
    { id: 1, name: "Alice Smith", form: "Contact Us", date: "2 mins ago", status: "New" },
    { id: 2, name: "Bob Johnson", form: "Newsletter", date: "1 hour ago", status: "Processed" },
    { id: 3, name: "Charlie Davis", form: "Demo Request", date: "3 hours ago", status: "New" },
    { id: 4, name: "Diana Prince", form: "Ebook Download", date: "1 day ago", status: "Processed" },
];

export const WebsiteConversion = ({ branch }) => {
    return (
        <div className={styles.conversionPage}>
            <h1 className={styles.pageTitle}>Website Conversion</h1>

            {/* 1. Conversion Overview */}
            <div className={styles.kpiGrid}>
                <div className={`${styles.kpiCard} ${styles.blue}`}>
                    <div className={styles.kpiHeader}>
                        <h4>Website Visitors</h4>
                        <Globe size={20} className={styles.icon} />
                    </div>
                    <h2>2,850</h2>
                    <span>+12% vs last week</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.green}`}>
                    <div className={styles.kpiHeader}>
                        <h4>Leads Captured</h4>
                        <Users size={20} className={styles.icon} />
                    </div>
                    <h2>179</h2>
                    <span>+8% vs last week</span>
                </div>

                <div className={`${styles.kpiCard} ${styles.orange}`}>
                    <div className={styles.kpiHeader}>
                        <h4>Conversion Rate</h4>
                        <MousePointerClick size={20} className={styles.icon} />
                    </div>
                    <h2>6.2%</h2>
                    <span>-0.5% vs last week</span>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Chart Section */}
                <div className={styles.chartCard}>
                    <h3>Lead Generation Trend</h3>
                    <ResponsiveContainer width="100%" height={300} style={{ marginTop: "20px" }}>
                        <AreaChart data={mockVisitorData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="leads" stroke="#10b981" fillOpacity={1} fill="url(#colorLeads)" />
                            <defs>
                                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. Lead Capture Forms & 5. Chat Widget */}
                <div className={styles.sideGrid}>
                    <div className={styles.actionCard}>
                        <div className={styles.actionHeader}>
                            <FormInput size={24} color="#0ea5e9" />
                            <h3>Lead Capture Forms</h3>
                        </div>
                        <p>Create and embed forms on your website to instantly capture leads.</p>
                        <div className={styles.actionButtons}>
                            <button className={styles.primaryBtn}>Create New Form</button>
                            <button className={styles.secondaryBtn}>Get Embed Code</button>
                        </div>
                    </div>

                    <div className={styles.actionCard}>
                        <div className={styles.actionHeader}>
                            <MessageSquare size={24} color="#8b5cf6" />
                            <h3>Website Chat Widget</h3>
                        </div>
                        <p>Engage with live visitors and convert them to leads automatically.</p>
                        <div className={styles.actionButtons}>
                            <button className={styles.primaryBtn}>Configure Widget</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomGrid}>
                {/* 3. Landing Pages */}
                <div className={styles.listCard}>
                    <div className={styles.cardHeaderFlex}>
                        <div className={styles.headerLeft}>
                            <LayoutTemplate size={20} color="#f59e0b" />
                            <h3>Landing Pages</h3>
                        </div>
                        <button className={styles.textBtn}>Create Page <ArrowUpRight size={16} /></button>
                    </div>
                    <div className={styles.pageList}>
                        <div className={styles.pageItem}>
                            <div>
                                <h5>Product Demo Promo</h5>
                                <span>/promo/demo-request</span>
                            </div>
                            <div className={styles.pageStats}>
                                <span>1.2k views</span>
                                <span className={styles.highlight}>8.4% conv.</span>
                            </div>
                        </div>
                        <div className={styles.pageItem}>
                            <div>
                                <h5>Newsletter Signup</h5>
                                <span>/subscribe</span>
                            </div>
                            <div className={styles.pageStats}>
                                <span>3.4k views</span>
                                <span className={styles.highlight}>4.1% conv.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Website Tracking */}
                <div className={styles.listCard}>
                    <div className={styles.cardHeaderFlex}>
                        <div className={styles.headerLeft}>
                            <Activity size={20} color="#ef4444" />
                            <h3>Recent Form Submissions</h3>
                        </div>
                        <button className={styles.textBtn}>View All</button>
                    </div>
                    <div className={styles.submissionList}>
                        {mockSubmissions.map(sub => (
                            <div key={sub.id} className={styles.subItem}>
                                <div className={styles.subInfo}>
                                    <strong>{sub.name}</strong>
                                    <span>{sub.form}</span>
                                </div>
                                <div className={styles.subMeta}>
                                    <span className={styles.time}>{sub.date}</span>
                                    <span className={`${styles.statusBadge} ${sub.status === 'New' ? styles.statusNew : styles.statusProcessed}`}>
                                        {sub.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
