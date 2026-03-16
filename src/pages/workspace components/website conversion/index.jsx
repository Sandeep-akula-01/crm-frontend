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
import { Trash2, Edit2, X as CloseIcon } from "lucide-react";

// The storage key from Campaigns module
const LP_STORAGE_KEY = "crm_landing_pages";

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
    // Shared landing page state
    const [landingPages, setLandingPages] = React.useState(() => {
        const defaultPages = [
            {
                id: 1,
                name: "Product Demo Promo",
                slug: "demo-request",
                campaign: "Demo Email Blast",
                status: "Published",
                leads: 124,
                conversion: "8.4%",
            },
            {
                id: 2,
                name: "Newsletter Signup",
                slug: "subscribe",
                campaign: "Site Footer",
                status: "Published",
                leads: 341,
                conversion: "4.1%",
            }
        ];

        const saved = localStorage.getItem(LP_STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultPages;
    });

    const [activeLanding, setActiveLanding] = React.useState(null);
    const [activeLPTab, setActiveLPTab] = React.useState("overview");
    const [showChatWidget, setShowChatWidget] = React.useState(false);
    const editorRef = React.useRef(null);

    React.useEffect(() => {
        localStorage.setItem(LP_STORAGE_KEY, JSON.stringify(landingPages));
    }, [landingPages]);

    const handleDeleteLanding = (id) => {
        setLandingPages(landingPages.filter((lp) => lp.id !== id));
        if (activeLanding?.id === id) {
            setActiveLanding(null);
        }
    };

    const handleCreateNewForm = () => {
        const newPage = {
            id: Date.now(),
            name: "New Capture Form",
            slug: "new-capture",
            campaign: "Direct Website",
            status: "Draft",
            leads: 0,
            conversion: "0%",
        };
        setLandingPages([...landingPages, newPage]);
        setActiveLanding(newPage);
        setTimeout(() => {
            editorRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

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
                            <button className={styles.primaryBtn} onClick={handleCreateNewForm}>Create New Form</button>
                            <button className={styles.secondaryBtn}>Get Embed Code</button>
                        </div>
                    </div>

                    {/* EXPANDABLE EDITOR LOCATED BELOW SECTION */}
                    {activeLanding && (
                        <div ref={editorRef} className={styles.editorWrapper}>
                            <div className={styles.editorHeader}>
                                <h3>{activeLanding.name}</h3>
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setActiveLanding(null)}
                                >
                                    <CloseIcon size={18} />
                                </button>
                            </div>

                            <div className={styles.tabsEditor}>
                                {["overview", "content", "form", "analytics"].map((tab) => (
                                    <div
                                        key={tab}
                                        className={`${styles.tabEditor} ${activeLPTab === tab ? styles.activeTabEditor : ""}`}
                                        onClick={() => setActiveLPTab(tab)}
                                    >
                                        {tab.toUpperCase()}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.tabContent}>
                                {activeLPTab === "overview" && (
                                    <>
                                        <label>Page Name</label>
                                        <input
                                            value={activeLanding.name}
                                            onChange={(e) => setActiveLanding({ ...activeLanding, name: e.target.value })}
                                        />
                                        <label>URL Slug</label>
                                        <input
                                            value={activeLanding.slug}
                                            onChange={(e) => setActiveLanding({ ...activeLanding, slug: e.target.value })}
                                        />
                                        <label>Status</label>
                                        <select
                                            value={activeLanding.status}
                                            onChange={(e) => setActiveLanding({ ...activeLanding, status: e.target.value })}
                                        >
                                            <option>Draft</option>
                                            <option>Published</option>
                                        </select>
                                    </>
                                )}

                                {activeLPTab === "content" && (
                                    <>
                                        <label>Headline</label>
                                        <input placeholder="Big bold headline here" />
                                        <label>Description</label>
                                        <textarea placeholder="Write your landing content..." rows={4} />
                                    </>
                                )}

                                {activeLPTab === "form" && (
                                    <>
                                        <label>Select Fields</label>
                                        <div className={styles.checkboxGroup}>
                                            <label><input type="checkbox" defaultChecked /> Name</label>
                                            <label><input type="checkbox" defaultChecked /> Email</label>
                                            <label><input type="checkbox" /> Phone</label>
                                            <label><input type="checkbox" /> Company</label>
                                        </div>
                                    </>
                                )}

                                {activeLPTab === "analytics" && (
                                    <div className={styles.analyticsBox}>
                                        <div>Visitors: —</div>
                                        <div>Leads: {activeLanding.leads}</div>
                                        <div>Conversion Rate: {activeLanding.conversion}</div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.editorActions}>
                                <button
                                    className={styles.saveBtn}
                                    onClick={() => {
                                        setLandingPages(landingPages.map((lp) => lp.id === activeLanding.id ? activeLanding : lp));
                                        alert("Landing Page saved locally.");
                                    }}
                                >
                                    Save Changes
                                </button>

                                <button
                                    className={styles.publishBtn}
                                    onClick={() => setActiveLanding({ ...activeLanding, status: "Published" })}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.actionCard}>
                        <div className={styles.actionHeader}>
                            <MessageSquare size={24} color="#8b5cf6" />
                            <h3>Website Chat Widget</h3>
                        </div>
                        <p>Engage with live visitors and convert them to leads automatically.</p>
                        <div className={styles.actionButtons}>
                            <button className={styles.primaryBtn} onClick={() => setShowChatWidget(!showChatWidget)}>
                                {showChatWidget ? "Hide Widget" : "Configure Widget"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomGrid}>
                <div className={styles.listCard}>
                    <div className={styles.cardHeaderFlex}>
                        <div className={styles.headerLeft}>
                            <LayoutTemplate size={20} color="#f59e0b" />
                            <h3>Landing Pages</h3>
                        </div>
                        <button className={styles.textBtn} onClick={handleCreateNewForm}>Create Page <ArrowUpRight size={16} /></button>
                    </div>
                    <div className={styles.pageList}>
                        {landingPages.slice(0, 5).map(page => (
                            <div key={page.id} className={styles.pageItemRow} onClick={() => {
                                setActiveLanding(page);
                                setTimeout(() => editorRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
                            }}>
                                <div className={styles.pageItemInfo}>
                                    <h5>{page.name}</h5>
                                    <span>/{page.slug}</span>
                                </div>
                                <div className={styles.pageStats}>
                                    <span>{page.leads} leads</span>
                                    <span className={styles.highlight}>{page.conversion} conv.</span>
                                </div>
                            </div>
                        ))}
                        {landingPages.length === 0 && <p className={styles.emptyState}>No landing pages created yet.</p>}
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

            {/* SIMULATED CHAT WIDGET */}
            {showChatWidget && (
                <div className={styles.fakeChatWidget}>
                    <div className={styles.chatHeader}>
                        <div>
                            <h4>Live Chat Support</h4>
                            <span>We reply immediately</span>
                        </div>
                        <button onClick={() => setShowChatWidget(false)}><CloseIcon size={16} /></button>
                    </div>
                    <div className={styles.chatBody}>
                        <div className={styles.msgBot}>Hi! How can we help you? 👋</div>
                    </div>
                    <div className={styles.chatInput}>
                        <input type="text" placeholder="Type your message..." />
                        <button>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};
