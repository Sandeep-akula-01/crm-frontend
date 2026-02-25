import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    FunnelChart,
    Funnel,
    LabelList
} from "recharts";
import {
    DollarSign,
    BarChart2,
    Target,
    Zap,
    TrendingUp,
    Users,
    PieChart as PieIcon,
    Clock,
    ArrowUpRight
} from "lucide-react";
import styles from "./analytics.module.css";

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// --- Helper Component for Scroll-Triggered Charts ---
const ScrollChart = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} style={{ width: '100%', height: '100%', minHeight: '300px', position: 'relative' }}>
            {isInView ? (
                <ResponsiveContainer width="99%" height="100%" debounce={100}>
                    {children}
                </ResponsiveContainer>
            ) : (
                <div style={{ width: '100%', height: '100%', minHeight: '300px' }} />
            )}
        </div>
    );
};

// --- DUMMY DATA ---

const revenueData = [
    { name: "Jan", revenue: 45000 },
    { name: "Feb", revenue: 52000 },
    { name: "Mar", revenue: 48000 },
    { name: "Apr", revenue: 61000 },
    { name: "May", revenue: 55000 },
    { name: "Jun", revenue: 72000 },
    { name: "Jul", revenue: 68000 },
    { name: "Aug", revenue: 85000 },
    { name: "Sep", revenue: 79000 },
    { name: "Oct", revenue: 92000 },
    { name: "Nov", revenue: 98000 },
    { name: "Dec", revenue: 115000 },
];

const pipelineStages = [
    { stage: "Proposed", value: 45, fill: "#bfdbfe" }, // Pastel Blue
    { stage: "Negotiating", value: 30, fill: "#e9d5ff" }, // Pastel Purple
    { stage: "Win", value: 20, fill: "#bbf7d0" }, // Pastel Green
    { stage: "Loss", value: 5, fill: "#fed7aa" }, // Pastel Orange
];

const funnelData = [
    { value: 100, name: "Leads", fill: "#bfdbfe" }, // Blue
    { value: 80, name: "Qualified", fill: "#bbf7d0" }, // Green
    { value: 50, name: "Proposal", fill: "#e9d5ff" }, // Purple
    { value: 30, name: "Negotiation", fill: "#fed7aa" }, // Orange
    { value: 20, name: "Closed Won", fill: "#fbcfe8" }, // Pink
];

const winLossData = [
    { name: "Win", value: 65, color: "#16a34a" }, // Green
    { name: "Loss", value: 35, color: "#db2777" }, // Pink
];

const leadSourceData = [
    { name: "Ads", value: 40, color: "#2563eb" }, // Blue
    { name: "Social", value: 25, color: "#db2777" }, // Pink
    { name: "Referral", value: 20, color: "#16a34a" }, // Green
    { name: "Direct", value: 15, color: "#ea580c" }, // Orange
];

const leadStatusData = [
    { name: "New", count: 120 },
    { name: "Contacted", count: 85 },
    { name: "Interested", count: 45 },
    { name: "In Progress", count: 30 },
    { name: "Closed", count: 15 },
];

const leadTrendData = [
    { name: "Week 1", count: 45 },
    { name: "Week 2", count: 52 },
    { name: "Week 3", count: 38 },
    { name: "Week 4", count: 65 },
    { name: "Week 5", count: 48 },
    { name: "Week 6", count: 72 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.customTooltip}>
                <p className={styles.tooltipLabel}>{label || payload[0].name}</p>
                <p className={styles.tooltipValue}>
                    {typeof payload[0].value === 'number' ?
                        (payload[0].name === 'revenue' ? `₹${payload[0].value.toLocaleString()}` : payload[0].value)
                        : payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function Analytics() {
    return (
        <motion.div
            className={styles.analyticsPage}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >

            {/* 3️⃣ Revenue Analytics Section */}
            <motion.section
                className={styles.section}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.sectionHeader}>
                    <h2>Revenue Analytics</h2>
                    <p>Financial performance and trends</p>
                </div>

                <div className={styles.chartsGrid}>
                    <motion.div
                        className={styles.chartCard}
                        style={{ gridColumn: 'span 2' }}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><DollarSign size={18} color="#2563eb" /> Revenue Trend (Last 12 Months)</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#dbeafe" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#dbeafe" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#revenueGrad)"
                                        animationDuration={1500}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                                    />
                                </AreaChart>
                            </ScrollChart>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 4️⃣ Pipeline Analytics Section */}
            <motion.section
                className={styles.section}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.sectionHeader}>
                    <h2>Pipeline Analytics</h2>
                    <p>Deal flow and conversion stages</p>
                </div>

                <div className={styles.chartsGrid}>
                    {/* Deals by Stage */}
                    <motion.div
                        className={styles.chartCard}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><BarChart2 size={18} color="#16a34a" /> Deals by Stage</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <BarChart data={pipelineStages} layout="vertical" margin={{ left: 20 }}>
                                    <defs>
                                        <linearGradient id="barGrad-0" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#b6e3ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="barGrad-1" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#c3b6ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#9333ea" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="barGrad-2" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#b6ffd8" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="barGrad-3" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#ffdab6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#ea580c" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32} animationDuration={1200}>
                                        {pipelineStages.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#barGrad-${index})`} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ScrollChart>
                        </div>
                    </motion.div>

                    {/* Win vs Lost Ratio */}
                    <motion.div
                        className={styles.chartCard}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><Target size={18} color="#db2777" /> Win vs Lost Ratio</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <PieChart>
                                    <defs>
                                        <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b6ffd8" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffb6d5" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#db2777" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={winLossData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                        animationBegin={200}
                                        animationDuration={1500}
                                    >
                                        <Cell fill="url(#winGrad)" />
                                        <Cell fill="url(#lossGrad)" />
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ScrollChart>
                        </div>
                    </motion.div>

                    {/* Stage Conversion Rate (Funnel) */}
                    <motion.div
                        className={styles.chartCard}
                        style={{ gridColumn: 'span 2' }}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><Zap size={18} color="#ea580c" /> Stage Conversion Rate</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <FunnelChart>
                                    <defs>
                                        <linearGradient id="funnelGrad-0" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b6e3ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="funnelGrad-1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b6ffd8" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="funnelGrad-2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#c3b6ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#9333ea" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="funnelGrad-3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffdab6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#ea580c" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="funnelGrad-4" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffb6d5" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#db2777" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Funnel
                                        dataKey="value"
                                        data={funnelData}
                                        isAnimationActive
                                        stroke="none"
                                        animationDuration={1800}
                                    >
                                        {funnelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#funnelGrad-${index})`} />
                                        ))}
                                        <LabelList position="right" fill="#64748b" stroke="none" dataKey="name" />
                                    </Funnel>
                                </FunnelChart>
                            </ScrollChart>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 5️⃣ Lead Analytics Section */}
            <motion.section
                className={styles.section}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.sectionHeader}>
                    <h2>Lead Analytics</h2>
                    <p>Aquisition and interest tracking</p>
                </div>

                <div className={styles.kpiRow}>
                    <motion.div
                        className={styles.statItem}
                        variants={itemVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <span className={styles.statLabel}><Target size={18} color="#2563eb" /> Lead Conversion Rate</span>
                        <span className={styles.statValue}>24.8%</span>
                        <span className={styles.statSub} style={{ color: '#16a34a' }}><ArrowUpRight size={14} /> +4.2% since last month</span>
                    </motion.div>
                    <motion.div
                        className={styles.statItem}
                        variants={itemVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <span className={styles.statLabel}><DollarSign size={18} color="#ea580c" /> Avg. Cost per Lead</span>
                        <span className={styles.statValue}>₹450</span>
                        <span className={styles.statSub} style={{ color: '#db2777' }}><TrendingUp size={14} /> +12% increase</span>
                    </motion.div>
                </div>

                <div className={styles.chartsGrid}>
                    {/* Leads by Source */}
                    <motion.div
                        className={styles.chartCard}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><PieIcon size={18} color="#2563eb" /> Leads by Source</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <PieChart>
                                    <defs>
                                        <linearGradient id="srcGrad-0" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b6e3ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="srcGrad-1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffb6d5" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#db2777" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="srcGrad-2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b6ffd8" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="srcGrad-3" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffdab6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#ea580c" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Pie
                                        data={leadSourceData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        stroke="none"
                                        animationDuration={1500}
                                    >
                                        <Cell fill="url(#srcGrad-0)" />
                                        <Cell fill="url(#srcGrad-1)" />
                                        <Cell fill="url(#srcGrad-2)" />
                                        <Cell fill="url(#srcGrad-3)" />
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ScrollChart>
                        </div>
                    </motion.div>

                    {/* Leads by Status */}
                    <motion.div
                        className={styles.chartCard}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><Users size={18} color="#9333ea" /> Leads by Status</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <BarChart data={leadStatusData}>
                                    <defs>
                                        <linearGradient id="statusGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#c3b6ff" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#9333ea" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                                    <Bar dataKey="count" fill="url(#statusGrad)" radius={[10, 10, 0, 0]} animationDuration={1400} />
                                </BarChart>
                            </ScrollChart>
                        </div>
                    </motion.div>

                    {/* Leads Created Trend */}
                    <motion.div
                        className={styles.chartCard}
                        style={{ gridColumn: 'span 2' }}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <h3><TrendingUp size={18} color="#16a34a" /> Leads Created Trend</h3>
                        <div className={styles.chartContainer}>
                            <ScrollChart>
                                <LineChart data={leadTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="stepAfter"
                                        dataKey="count"
                                        stroke="#16a34a"
                                        strokeWidth={4}
                                        dot={{ r: 4, strokeWidth: 0, fill: '#16a34a' }}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#16a34a' }}
                                        animationDuration={2000}
                                    />
                                </LineChart>
                            </ScrollChart>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 6️⃣ Activity & Productivity Analytics */}
            <motion.section
                className={styles.section}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={styles.sectionHeader}>
                    <h2>Activity & Productivity</h2>
                    <p>Team efficiency and response times</p>
                </div>

                <div className={styles.kpiRow}>
                    <motion.div
                        className={styles.statItem}
                        variants={itemVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <span className={styles.statLabel}><Clock size={18} color="#2563eb" /> Avg Response Time</span>
                        <span className={styles.statValue}>1h 45m</span>
                        <span className={styles.statSub} style={{ color: '#16a34a' }}><Zap size={14} /> Within SLA target (2h)</span>
                    </motion.div>
                    <motion.div
                        className={styles.statItem}
                        variants={itemVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <span className={styles.statLabel}><BarChart2 size={18} color="#9333ea" /> Total Activities</span>
                        <span className={styles.statValue}>1,452</span>
                        <span className={styles.statSub} style={{ color: '#2563eb' }}><ArrowUpRight size={14} /> +15% this week</span>
                    </motion.div>
                    <motion.div
                        className={styles.statItem}
                        variants={itemVariants}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                        <span className={styles.statLabel}><Users size={18} color="#16a34a" /> Tasks Completed</span>
                        <span className={styles.statValue}>89%</span>
                        <span className={styles.statSub} style={{ color: '#16a34a' }}><Target size={14} /> High efficiency</span>
                    </motion.div>
                </div>
            </motion.section>

        </motion.div>
    );
}
