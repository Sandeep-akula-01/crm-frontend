import React, { useState } from "react";
import styles from "./teams.module.css";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    Shield,
    Mail,
    Phone,
    Clock,
    UserCheck
} from "lucide-react";

export const Team = ({ branch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    // Mock team data
    const teamMembers = [
        {
            id: 1,
            name: "Sandeep Kumar",
            role: "Admin",
            status: "Online",
            email: "sandeep@example.com",
            phone: "+91 98765 43210",
            lastActive: "Now",
            initials: "SK",
            color: "#1d4ed8"
        },
        {
            id: 2,
            name: "Ananya Rao",
            role: "Manager",
            status: "Online",
            email: "ananya@example.com",
            phone: "+91 87654 32109",
            lastActive: "10m ago",
            initials: "AR",
            color: "#3b82f6"
        },
        {
            id: 3,
            name: "Rahul Varma",
            role: "Agent",
            status: "Offline",
            email: "rahul@example.com",
            phone: "+91 76543 21098",
            lastActive: "2h ago",
            initials: "RV",
            color: "#10b981"
        },
        {
            id: 4,
            name: "Priya Singh",
            role: "Agent",
            status: "Pending",
            email: "priya@example.com",
            phone: "+91 65432 10987",
            lastActive: "Invited",
            initials: "PS",
            color: "#f59e0b"
        },
        {
            id: 5,
            name: "Vikram Shah",
            role: "Manager",
            status: "Away",
            email: "vikram@example.com",
            phone: "+91 54321 09876",
            lastActive: "45m ago",
            initials: "VS",
            color: "#3b82f6"
        }
    ];

    const filteredTeam = teamMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "All" || member.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Online": return "#10b981";
            case "Away": return "#f59e0b";
            case "Offline": return "#6b7280";
            case "Pending": return "#3b82f6";
            default: return "#6b7280";
        }
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h2>Team Management</h2>
                    <div className={styles.branchTag}>{branch.name} Branch</div>
                </div>
                <button className={styles.inviteBtn}>
                    <UserPlus size={18} /> Invite Member
                </button>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "#e0f2fe", color: "#0ea5e9" }}>
                        <Users size={20} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Total Members</span>
                        <span className={styles.statValue}>{teamMembers.length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "#dcfce7", color: "#10b981" }}>
                        <UserCheck size={20} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Active Now</span>
                        <span className={styles.statValue}>{teamMembers.filter(m => m.status === "Online").length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "#fef3c7", color: "#d97706" }}>
                        <Clock size={20} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Pending</span>
                        <span className={styles.statValue}>{teamMembers.filter(m => m.status === "Pending").length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "#eff6ff", color: "#1d4ed8" }}>
                        <Shield size={20} />
                    </div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Admins</span>
                        <span className={styles.statValue}>{teamMembers.filter(m => m.role === "Admin").length}</span>
                    </div>
                </div>
            </div>

            {/* Directory Section */}
            <div className={styles.directoryCard}>
                <div className={styles.directoryHeader}>
                    <div className={styles.searchBar}>
                        <Search size={16} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <Filter size={14} color="#64748b" />
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className={styles.roleSelect}
                            >
                                <option value="All">All Roles</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Agent">Agent</option>
                            </select>
                        </div>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Contact</th>
                            <th>Activity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeam.map(member => (
                            <tr key={member.id} className={styles.tableRow}>
                                <td>
                                    <div className={styles.memberInfo}>
                                        <div
                                            className={styles.avatar}
                                            style={{ backgroundColor: `${member.color}15`, color: member.color }}
                                        >
                                            {member.initials}
                                        </div>
                                        <div className={styles.memberNameWrap}>
                                            <span className={styles.memberName}>{member.name}</span>
                                            <span className={styles.memberEmail}>{member.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`${styles.roleBadge} ${styles[member.role.toLowerCase()]}`}>
                                        {member.role}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.statusWrap}>
                                        <div
                                            className={styles.statusDot}
                                            style={{ backgroundColor: getStatusColor(member.status) }}
                                        />
                                        <span className={styles.statusText}>{member.status}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.contactIcons}>
                                        <Mail size={14} title={member.email} />
                                        <Phone size={14} title={member.phone} />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.lastActive}>{member.lastActive}</span>
                                </td>
                                <td>
                                    <button className={styles.moreBtn}>
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
