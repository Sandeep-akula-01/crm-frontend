import React, { useEffect, useState } from "react";
import styles from "./leads.module.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


const leadTrend = [
    { week: "W1", all: 22, qualified: 12 },
    { week: "W2", all: 30, qualified: 18 },
    { week: "W3", all: 18, qualified: 28 },
    { week: "W4", all: 42, qualified: 34 },
    { week: "W5", all: 55, qualified: 40 },
    { week: "W6", all: 68, qualified: 52 },
]; ''

const tempLeads = [
    {
        name: "Riya Sharma",
        email: "riya@gmail.com",
        company: "Pixel Labs",
        source: "Instagram",
        status: "Hot",
        score: "High",
        sla: "On Track",
        owner: "Varshini",
        createdAt: "2 days ago",
        description: "Interested in website redesign",
    },
    {
        name: "Aman Patel",
        email: "aman@corp.com",
        company: "CorpEdge",
        source: "Campaign",
        status: "Follow-up",
        score: "Medium",
        sla: "Delayed",
        owner: "Ravi",
        createdAt: "Today",
        description: "Needs pricing details",
    },
    {
        name: "Neha Verma",
        email: "neha@mail.com",
        company: "Bloom Co",
        source: "Website",
        status: "Converted",
        score: "High",
        sla: "On Track",
        owner: "Anu",
        createdAt: "5 days ago",
        description: "Closed premium plan",
    },
    {
        name: "Rahul Singh",
        email: "rahul@xyz.com",
        company: "XYZ Pvt Ltd",
        source: "Referral",
        status: "Lost",
        score: "Low",
        sla: "Delayed",
        owner: "Varshini",
        createdAt: "1 week ago",
        description: "Budget mismatch",
    },
];


export default function Leads({ branch }) {

    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sourceFilter, setSourceFilter] = useState("All");

    const filtered = leads.filter(l =>
        (statusFilter === "All" || l.status === statusFilter) &&
        (sourceFilter === "All" || l.source === sourceFilter) &&
        (
            l.name?.toLowerCase().includes(search.toLowerCase()) ||
            l.email?.toLowerCase().includes(search.toLowerCase()) ||
            l.company?.toLowerCase().includes(search.toLowerCase())
        )
    );

    const total = leads.length;
    const hot = leads.filter(l => l.status === "Hot").length;
    const converted = leads.filter(l => l.status === "Converted").length;
    const lost = leads.filter(l => l.status === "Lost").length;
    const newWeek = leads.filter(l => l.isNewThisWeek).length;

    const campaigns = {};
    leads.forEach(l => {
        campaigns[l.source] = (campaigns[l.source] || 0) + 1;
    });


    return (
        <>
            <div className={styles.leadsWrap}>

                {/* KPI CARDS */}
                <div className={styles.leadsKpiGrid}>
                    <div className={`${styles.leadsKpi} ${styles.kpiTotal}`}>
                        <span>Total Leads</span>
                        <strong>{total}</strong>
                    </div>
                    <div className={`${styles.leadsKpi} ${styles.kpiNew}`}>
                        <span>New This Week</span>
                        <strong>{newWeek}</strong>
                    </div>
                    <div className={`${styles.leadsKpi} ${styles.kpiHot}`}>
                        <span>Hot Leads</span>
                        <strong>{hot}</strong>
                    </div>
                    <div className={`${styles.leadsKpi} ${styles.kpiConverted}`}>
                        <span>Converted</span>
                        <strong>{converted}</strong>
                    </div>
                    <div className={`${styles.leadsKpi} ${styles.kpiLost}`}>
                        <span>Lost</span>
                        <strong>{lost}</strong>
                    </div>
                </div>


                {/* TREND + CAMPAIGN ROW */}

                <div className={styles.leadsInsightsRow}>
                    {/* Leads Over Time */}
                    <div className={styles.leadsTrendCard}>
                        <div className={styles.trendHeader}>
                            <div>
                                <h3>Leads Over Time</h3>
                                <span>Last 6 Weeks</span>
                            </div>
                        </div>

                        <div className={styles.trendGraphWrap}>
                            <ResponsiveContainer width="100%" height={190}>
                                <LineChart data={leadTrend}>
                                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                                    <YAxis hide />
                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="all"
                                        stroke="#6b5cff"
                                        strokeWidth={2.5}
                                        dot={{ r: 3 }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="qualified"
                                        stroke="#3bbfa0"
                                        strokeWidth={2.5}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>



                    {/* Campaign Panel */}

                    <div className={styles.campaignPanel}>
                        <div className={styles.campaignHeader}>
                            <h3>Top Campaigns</h3>
                            <span>Last 30 days</span>
                        </div>

                        <div className={styles.campaignRow}>
                            <div className={styles.campaignLeft}>
                                <span className={styles.campaignDot}></span>
                                <strong>Instagram Ad</strong>
                            </div>
                            <span className={styles.campaignMeta}>124 leads • 18%</span>
                        </div>

                        <div className={styles.campaignRow}>
                            <div className={styles.campaignLeft}>
                                <span className={styles.campaignDot}></span>
                                <strong>Email Blast</strong>
                            </div>
                            <span className={styles.campaignMeta}>86 leads • 24%</span>
                        </div>

                        <div className={styles.campaignRow}>
                            <div className={styles.campaignLeft}>
                                <span className={styles.campaignDot}></span>
                                <strong>Website Form</strong>
                            </div>
                            <span className={styles.campaignMeta}>310 leads • 32%</span>
                        </div>

                        <button className={styles.campaignBtn}>View All Campaigns</button>
                    </div>




                </div>




                {/* SEARCH & FILTERS */}
                {/* CONTROLS BAR */}
                <div className={styles.leadsTopBar}>
                    <div className={styles.leadsLeftControls}>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className={styles.leadsSelect}
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Hot">Hot</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>

                        <select
                            value={sourceFilter}
                            onChange={e => setSourceFilter(e.target.value)}
                            className={styles.leadsSelect}
                        >
                            <option value="All">All Sources</option>
                            <option value="Website">Website</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Campaign">Campaign</option>
                            <option value="Referral">Referral</option>
                        </select>

                        <select className={styles.leadsSelect}>
                            <option>Sort: Latest</option>
                            <option>Sort: Name (A–Z)</option>
                            <option>Sort: Name (Z–A)</option>
                        </select>
                    </div>

                    <div className={styles.leadsRightControls}>
                        <input
                            className={styles.leadsSearch}
                            placeholder="Search leads..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        <button className={styles.createLeadBtn}>
                            + Create Lead
                        </button>
                    </div>
                </div>


                {/* ---------- LEADS List TABLE */}
                <div className={styles.leadsLayout}>
                    <div className={styles.leadsTableWrap}>
                        <table className={styles.leadsTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Score</th>
                                    <th>SLA</th>
                                    <th>Owner</th>
                                    <th>Created</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempLeads.map((l, i) => (
                                    <tr key={i}>
                                        <td className={styles.muted}>{i + 1}</td>
                                        <td className={styles.leadName}>{l.name}</td>
                                        <td className={styles.muted}>{l.email}</td>
                                        <td>{l.company}</td>
                                        <td><span className={styles.sourceChip}>{l.source}</span></td>
                                        <td>
                                            <span className={`${styles.status} ${styles[l.status.toLowerCase()]}`}>
                                                {l.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.score} ${styles[l.score.toLowerCase()]}`}>
                                                {l.score}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`${styles.sla} ${styles[l.sla.toLowerCase().replace(" ", "-")]}`}>
                                                {l.sla}
                                            </span>
                                        </td>

                                        <td>{l.owner}</td>
                                        <td className={styles.muted}>{l.createdAt}</td>
                                        <td className={styles.desc}>{l.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}