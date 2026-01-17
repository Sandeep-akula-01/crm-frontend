import React, { useState } from "react";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";


const fakeOrg = {
    name: "Acme Corp",
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
    "Team",
    "Organization",
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
            case "Team":
                return <h2>Team Management</h2>;
            case "Organization":
                return <h2>Organization Settings</h2>;
            case "Settings":
                return <h2>App Settings</h2>;
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
                        <h3>{fakeOrg.name}</h3>
                        <select
                            value={branch.id}
                            onChange={(e) =>
                                setBranch(fakeOrg.branches.find(b => b.id === Number(e.target.value)))
                            }
                        >
                            {fakeOrg.branches.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.name}, {b.state}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*<nav className={styles.nav}>
          {navItems.map(item => (
            <button
              key={item}
              className={`${styles.navItem} ${active === item ? styles.active : ""}`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav> */}

                    <nav className={styles.nav}>
                        {navItems.slice(0, 6).map(item => (
                            <button
                                key={item}
                                className={`${styles.navItem} ${active === item ? styles.active : ""}`}
                                onClick={() => setActive(item)}
                            >
                                {item}
                            </button>
                        ))}

                        <div className={styles.divider} />

                        {/* Workspace Tree */}
                        <div className={styles.workspaceBlock}>
                            <button
                                className={styles.workspaceTitle}
                                onClick={() => setOpenWorkspace(!openWorkspace)}
                            >
                                Workspace (Admin)
                            </button>

                            {openWorkspace && (
                                <div className={styles.tree}>
                                    {workspace.states.map((s, i) => (
                                        <div key={s.name}>
                                            <div
                                                className={styles.state}
                                                onClick={() => setOpenState(openState === i ? null : i)}
                                            >
                                                {s.name}
                                            </div>

                                            {openState === i &&
                                                s.branches.map(b => (
                                                    <div key={b} className={styles.branch}>
                                                        {b}
                                                    </div>
                                                ))}
                                        </div>
                                    ))}

                                    <div className={styles.usersTitle}>Users</div>
                                    {workspace.users.map(u => (
                                        <div key={u} className={styles.user}>
                                            {u}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.divider} />

                        {["Team", "Organization", "Roles & Permissions", "Settings"].map(item => (
                            <button
                                key={item}
                                className={`${styles.navItem} ${active === item ? styles.active : ""}`}
                                onClick={() => setActive(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom */}
                    <div className={styles.bottomNav}>
                        <div className={styles.divider} />
                        <button className={styles.navItem}>Profile</button>
                        <button className={styles.logout}>Logout</button>
                    </div>
                </aside>

                {/* Main Area */}
                <main className={styles.main}>
                    <div className={styles.workspace}>
                        <div className={styles.header}>
                            <h1>{active}</h1>
                            <span className={styles.branchTag}>
                                {branch.name}, {branch.state}
                            </span>
                        </div>

                        <div className={styles.content}>
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>


        </>
    )
}