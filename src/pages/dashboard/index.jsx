import React, { useState, useEffect, useRef } from "react";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import Main from "../dashboard components/main";
import Workspace from "../workspace components/workspace";
import {
    User,
    LogOut,
    LayoutDashboard,
    UserPlus,
    DollarSign,
    CheckCircle2,
    Users,
    BarChart2,
    Calendar,
    Layout,
    Inbox,
    Zap,
    Rocket,
    Settings,
    MapPin,
    Bell,
    Phone,
    Shield,
    HelpCircle,
    FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";




const fakeOrg = {
    name: "Rvh Crm",
    branches: [
        { id: 1, name: "Hyderabad", state: "Telangana" },
        { id: 2, name: "Warangal", state: "Telangana" },
        { id: 3, name: "Bangalore", state: "Karnataka" },
    ],
};

const navItems = [
    "Dashboard",
    "Leads",
    "Deals",
    "Tasks",
    "Contacts",
    "Reports",
    "Calendar",
    "Workspace",
    "Team",
    "Inbox",
    "Marketing",
    "Campaigns",
    "Settings",
];


const workspace = {
    states: [
        {
            name: "Telangana",
            branches: ["Hyderabad", "Warangal"],
        },
        {
            name: "Karnataka",
            branches: ["Bangalore", "Mysore"],
        },
    ],
    users: [
        "Varshini (Admin)",
        "Ravi (Manager – Hyderabad)",
        "Anu (User – Bangalore)",
    ],
};



export default function Dashboard() {

    const [active, setActive] = useState("Dashboard");
    const [branch, setBranch] = useState(fakeOrg.branches[0]);


    const [openState, setOpenState] = useState(null);
    const [openWorkspace, setOpenWorkspace] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null); // "notification" | "profile" | null

    // Refs for dropdowns
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (openDropdown === "notification" && notificationRef.current && !notificationRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
            if (openDropdown === "profile" && profileRef.current && !profileRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);


    const renderContent = () => {
        switch (active) {
            case "Dashboard":
                return (
                    <>
                        <h2>Overview</h2>
                        <div className={styles.cards}>
                            <div className={styles.statCard}>Leads<br /><b>128</b></div>
                            <div className={styles.statCard}>Deals<br /><b>32</b></div>
                            <div className={styles.statCard}>Tasks<br /><b>14</b></div>
                        </div>
                    </>
                );
            case "Leads":
                return <h2>All Leads – {branch.name}</h2>;
            case "Deals":
                return <h2>Active Deals</h2>;
            case "Tasks":
                return <h2>Your Tasks</h2>;
            case "Contacts":
                return <h2>Contacts</h2>;
            case "Reports":
                return <h2>Reports & Insights</h2>;
            case "Calendar":
                return <h2>Calendar</h2>;
            case "Workspace Homepage":
                return <h2>Workspage management</h2>;
            case "Team":
                return <h2>Team Management</h2>;
            case "Inbox":
                return <h2>Inbox</h2>;
            case "Marketing":
                return <h2>Marketing & Performance</h2>;
            case "Campaigns":
                return <h2>Marketing Campaigns</h2>;
            case "Settings":
                return <h2>App Settings</h2>;
            case "Profile":
                return <h2>User Profile & Organization</h2>;
            default:
                return null;
        }
    };


    return (
        <>


            <div className={styles.layout}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>

                    <div className={styles.orgBlock}>
                        <h3 className={styles.orgName}>{fakeOrg.name}</h3>

                        <div className={styles.branchSwitcher}>
                            <button
                                className={styles.branchPill}
                                onClick={() => setOpenState(openState === "switcher" ? null : "switcher")}
                            >
                                {branch.state} · {branch.name}
                                <span className={styles.chevron}>⌄</span>
                            </button>

                            {openState === "switcher" && (
                                <div className={styles.branchDropdown}>
                                    {workspace.states.map((s) => (
                                        <div key={s.name} className={styles.ddState}>
                                            <div className={styles.ddStateName}>{s.name}</div>
                                            {s.branches.map((b) => (
                                                <div
                                                    key={b}
                                                    className={styles.ddBranch}
                                                    onClick={() => {
                                                        setBranch({ name: b, state: s.name });
                                                        setOpenState(null);
                                                    }}
                                                >
                                                    {b}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <nav className={styles.nav}>
                        {/* Main */}
                        {[
                            { name: "Dashboard", Icon: LayoutDashboard },
                            { name: "Leads", Icon: UserPlus },
                            { name: "Deals", Icon: DollarSign },
                            { name: "Tasks", Icon: CheckCircle2 },
                            { name: "Contacts", Icon: Users },
                            { name: "Reports", Icon: BarChart2 },
                            { name: "Calendar", Icon: Calendar },
                            { name: "Analytics", Icon: BarChart2 },
                            { name: "Pipelines", Icon: Layout },
                        ].map(({ name, Icon }) => (
                            <button
                                key={name}
                                className={`${styles.navItem} ${active === name ? styles.active : ""}`}
                                onClick={() => setActive(name)}
                            >
                                <Icon size={18} />
                                <span>{name}</span>
                            </button>
                        ))}

                        <div className={styles.divider} />

                        {/* Workspace */}
                        <div className={styles.workspaceSection}>
                            <div className={styles.workspaceHeading}>Workspace</div>



                            {/* States Hover */}

                            <div className={styles.statesWrap}>
                                <button
                                    className={`${styles.navItem} ${active === "States" ? styles.active : ""}`}
                                    onClick={() => setActive("States")}
                                >
                                    <MapPin size={18} />
                                    <span>States</span>
                                    <span className={styles.arrow}>▸</span>
                                </button>
                            </div>

                            {/*<button className={styles.navItem}>Workspace</button>
                            <button className={styles.navItem}>Team</button>
                            <button className={styles.navItem}>Roles & Permissions</button>
                            <button className={styles.navItem}>Campaigns</button>
                            <button className={styles.navItem}>Settings</button> */}

                            <button
                                className={`${styles.navItem} ${active === "Workspace" ? styles.active : ""}`}
                                onClick={() => setActive("Workspace")}
                            >
                                <Layout size={18} />
                                <span>Workspace</span>
                            </button>

                            <button
                                className={`${styles.navItem} ${active === "Team" ? styles.active : ""}`}
                                onClick={() => setActive("Team")}
                            >
                                <Users size={18} />
                                <span>Team</span>
                            </button>

                            <button
                                className={`${styles.navItem} ${active === "Inbox" ? styles.active : ""}`}
                                onClick={() => setActive("Inbox")}
                            >
                                <Inbox size={18} />
                                <span>Inbox</span>
                            </button>

                            <button
                                className={`${styles.navItem} ${active === "Marketing" ? styles.active : ""}`}
                                onClick={() => setActive("Marketing")}
                            >
                                <Zap size={18} />
                                <span>Marketing</span>
                            </button>

                            <button
                                className={`${styles.navItem} ${active === "Campaigns" ? styles.active : ""}`}
                                onClick={() => setActive("Campaigns")}
                            >
                                <Rocket size={18} />
                                <span>Campaigns</span>
                            </button>

                            <button
                                className={`${styles.navItem} ${active === "Settings" ? styles.active : ""}`}
                                onClick={() => setActive("Settings")}
                            >
                                <Settings size={18} />
                                <span>Settings</span>
                            </button>

                        </div>
                    </nav>


                    {/* Bottom */}
                    <div className={styles.bottomNav}>
                        <div className={styles.divider} />
                        <div className={styles.footerActions}>
                            <button
                                className={`${styles.navItem} ${active === "Profile" ? styles.active : ""}`}
                                onClick={() => setActive("Profile")}
                                title="Profile"
                            >
                                <User size={18} />
                                <span>Profile</span>
                            </button>
                            <button className={styles.logout} title="Logout">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Area */}
                <main className={styles.main}>
                    <div className={styles.workspace}>
                        <div className={styles.header}>
                            <h1>{active === "Inbox" ? "Inbox (Calls)" : active}</h1>

                            <div className={styles.headerIcons}>
                                <button
                                    className={`${styles.iconBtn} ${styles.btnSettings}`}
                                    onClick={() => setActive("Settings")}
                                    data-tooltip="Settings"
                                >
                                    <Settings size={20} />
                                </button>

                                <button
                                    className={`${styles.iconBtn} ${styles.btnCalendar} ${active === "Calendar" ? styles.activeIcon : ""}`}
                                    onClick={() => setActive("Calendar")}
                                    data-tooltip="Calendar"
                                >
                                    <Calendar size={20} />
                                </button>

                                <button
                                    className={`${styles.iconBtn} ${styles.btnInbox} ${active === "Inbox" ? styles.activeIcon : ""}`}
                                    onClick={() => setActive("Inbox")}
                                    data-tooltip="Communications"
                                >
                                    <Phone size={20} />
                                </button>

                                <div className={styles.relativeWrap} ref={notificationRef}>
                                    <button
                                        className={`${styles.iconBtn} ${styles.btnNotify} ${openDropdown === "notification" ? styles.activeIcon : ""}`}
                                        onClick={() => setOpenDropdown(openDropdown === "notification" ? null : "notification")}
                                        data-tooltip="Notifications"
                                    >
                                        <Bell size={20} />
                                    </button>

                                    <AnimatePresence>
                                        {openDropdown === "notification" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className={styles.notificationDropdown}
                                            >
                                                <div className={styles.dropdownHeader}>
                                                    <h3>Notifications</h3>
                                                    <span className={styles.markRead}>Mark all as read</span>
                                                </div>
                                                <div className={styles.notificationList}>
                                                    <div className={styles.emptyState}>
                                                        <motion.div
                                                            animate={{ scale: [1, 1.1, 1] }}
                                                            transition={{ repeat: Infinity, duration: 2 }}
                                                            className={styles.emptyIcon}
                                                        >
                                                            <Bell size={24} />
                                                        </motion.div>
                                                        <p>No notifications yet</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className={styles.relativeWrap} ref={profileRef}>
                                    <button
                                        className={`${styles.iconBtn} ${styles.btnProfile} ${openDropdown === "profile" ? styles.activeIcon : ""}`}
                                        onClick={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
                                        data-tooltip="Profile"
                                    >
                                        <User size={20} />
                                    </button>

                                    <AnimatePresence>
                                        {openDropdown === "profile" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className={styles.profileDropdown}
                                            >
                                                <div className={styles.profileHeader}>
                                                    <div className={styles.avatarCircle}>
                                                        <User size={24} />
                                                    </div>
                                                    <div className={styles.profileInfo}>
                                                        <h4>Varshini</h4>
                                                        <span>varshini@acmecorp.com</span>
                                                    </div>
                                                </div>
                                                <div className={styles.menuItems}>
                                                    <button
                                                        className={styles.menuItem}
                                                        onClick={() => {
                                                            setActive("Profile");
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        <User size={16} />
                                                        Personal Settings
                                                    </button>
                                                    <button
                                                        className={styles.menuItem}
                                                        onClick={() => {
                                                            setActive("States");
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        <MapPin size={16} />
                                                        Branches
                                                    </button>
                                                    <button className={styles.menuItem}>
                                                        <HelpCircle size={16} />
                                                        Support Ticket
                                                    </button>
                                                    <button className={styles.menuItem}>
                                                        <Shield size={16} />
                                                        Privacy Policy
                                                    </button>
                                                </div>
                                                <div className={styles.dropdownFooter}>
                                                    <button className={styles.logoutBtn}>
                                                        <LogOut size={16} />
                                                        Log out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className={styles.content}>
                            {/*{renderContent()} */}

                            <div className={styles.mainContent}>
                                {["Dashboard", "Leads", "Deals", "Tasks", "Contacts", "Reports", "Calendar", "Analytics", "Pipelines"].includes(active) ? (
                                    <Main active={active} branch={branch} />
                                ) : (
                                    <Workspace active={active} branch={branch} setActive={setActive} />
                                )}
                            </div>

                        </div>
                    </div>
                </main>
            </div>


        </>
    )
}