import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reports from "../reports";
import Analytics from "../analytics";
import Pipelines from "../pipelines";
import styles from "./insights.module.css";

export default function Insights({ active, branch, setActive }) {
    const insightTabs = ["Reports", "Analytics", "Pipelines"];

    return (
        <div className={styles.insightsLayout}>
            {/* Top Horizontal Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsNav}>
                    {insightTabs.map((tab) => (
                        <div
                            key={tab}
                            className={`${styles.tabItem} ${active === tab ? styles.activeTab : ""}`}
                            onClick={() => setActive(tab)}
                        >
                            {tab}
                            {active === tab && (
                                <motion.div
                                    className={styles.activeIndicator}
                                    layoutId="activeInsightIndicator"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{ width: "100%" }}
                    >
                        {active === "Reports" && <Reports branch={branch} />}
                        {active === "Analytics" && <Analytics />}
                        {active === "Pipelines" && <Pipelines />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
