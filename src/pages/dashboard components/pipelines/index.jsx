import React, { useState, useMemo } from "react";
import { Plus, MoreHorizontal, Zap, TrendingUp, DollarSign, Target, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./pipelines.module.css";

const stagesData = [
    {
        id: "Proposal",
        title: "Proposal",
        count: 4,
        deals: [
            { id: 1, title: "Acme Corp Expansion", company: "Acme Corp", value: "₹2,50,000", date: "Mar 12" },
            { id: 2, title: "Global Tech Integration", company: "Global Tech", value: "₹4,80,000", date: "Mar 15" },
            { id: 6, title: "HR System Upgrade", company: "Hooli", value: "₹2,10,000", date: "Mar 18" },
        ]
    },
    {
        id: "Negotiation",
        title: "Negotiation",
        count: 2,
        deals: [
            { id: 3, title: "Nexus Software License", company: "Nexus Sw", value: "₹1,20,000", date: "Mar 10" },
            { id: 7, title: "Cloud Infrastructure", company: "Skyline", value: "₹9,50,000", date: "Mar 22" },
        ]
    },
    {
        id: "Won",
        title: "Won",
        count: 3,
        deals: [
            { id: 5, title: "Infinite Loop R&D", company: "Apple", value: "₹12,00,000", date: "Feb 28" },
            { id: 8, title: "Enterprise CRM Setup", company: "Stark Ind", value: "₹15,00,000", date: "Jan 15" },
        ]
    },
    {
        id: "Lost",
        title: "Lost",
        count: 2,
        deals: [
            { id: 9, title: "Legacy System Sync", company: "Wayne Corp", value: "₹90,000", date: "Mar 05" },
            { id: 10, title: "Old Hardware Upgrade", company: "LexCorp", value: "₹1,50,000", date: "Mar 18" },
        ]
    }
];

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
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

export default function Pipelines() {
    const [stages, setStages] = useState(stagesData);

    // Automation Rules State
    const [automationRules, setAutomationRules] = useState([
        {
            id: 1,
            trigger: "When deal enters “Qualified”",
            actions: ["→ Assign to Sales Lead", "→ Send Welcome Email"],
            active: true
        },
        {
            id: 2,
            trigger: "If no activity for 3 days",
            actions: ["→ Flag as High Risk"],
            active: true
        },
        {
            id: 3,
            trigger: "When value > ₹5,00,000",
            actions: ["→ Notify VP of Sales"],
            active: false
        }
    ]);

    // Rule Modal State
    const [showRuleModal, setShowRuleModal] = useState(false);
    const [editingRuleId, setEditingRuleId] = useState(null);
    const [ruleForm, setRuleForm] = useState({
        trigger: "",
        actions: "",
        active: true
    });

    // --- Forecast Logic ---
    const parseAmount = (value) =>
        typeof value === 'string' ? Number(value.replace(/[₹,]/g, "")) : value;

    const forecastMetrics = useMemo(() => {
        const allDeals = stages.flatMap(s => s.deals);
        const totalValue = allDeals.reduce((sum, d) => sum + parseAmount(d.value), 0);

        // Mock probabilities based on stage position
        const STAGE_PROBS = { "Proposal": 0.4, "Negotiation": 0.8, "Won": 1, "Lost": 0 };
        const expectedRevenue = stages.reduce((sum, stage) => {
            const prob = STAGE_PROBS[stage.title] || 0;
            const stageTotal = stage.deals.reduce((s, d) => s + parseAmount(d.value), 0);
            return sum + (stageTotal * prob);
        }, 0);

        return {
            totalValue,
            expectedRevenue,
            dealCount: allDeals.length
        };
    }, [stages]);

    // --- Rule Handlers ---
    const handleAddRule = () => {
        setEditingRuleId(null);
        setRuleForm({ trigger: "", actions: "", active: true });
        setShowRuleModal(true);
    };

    const handleEditRule = (rule) => {
        setEditingRuleId(rule.id);
        setRuleForm({
            trigger: rule.trigger,
            actions: rule.actions.join("\n"),
            active: rule.active
        });
        setShowRuleModal(true);
    };

    const handleSaveRule = (e) => {
        e.preventDefault();
        const actionsList = ruleForm.actions.split("\n").filter(a => a.trim());
        const newRuleData = {
            trigger: ruleForm.trigger,
            actions: actionsList,
            active: ruleForm.active
        };

        if (editingRuleId) {
            setAutomationRules(prev => prev.map(r => r.id === editingRuleId ? { ...r, ...newRuleData } : r));
        } else {
            setAutomationRules(prev => [...prev, { id: Date.now(), ...newRuleData }]);
        }
        setShowRuleModal(false);
    };

    const handleDeleteRule = (id) => {
        if (window.confirm("Are you sure you want to delete this rule?")) {
            setAutomationRules(prev => prev.filter(r => r.id !== id));
        }
    };

    return (
        <motion.div
            className={styles.pipelinesPage}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className={styles.pipelineHeader} variants={itemVariants}>
                <h2>Deals Pipelines</h2>
                <button className={styles.newDealBtn}>
                    <Plus size={18} /> New Deal
                </button>
            </motion.div>

            {/* ---------- Forecast + Automation Row ---------- */}
            <motion.div className={styles.insightsRow} variants={itemVariants}>

                {/* Automation Section */}
                <div className={styles.automationSection}>
                    <div className={styles.automationHeader}>
                        <div>
                            <h3><Zap size={18} color="#6b5cff" /> Pipeline Automation</h3>
                            <p>Smart rules for deal movement and notifications</p>
                        </div>
                        <button className={styles.addRuleBtn} onClick={handleAddRule}>
                            + Add Rule
                        </button>
                    </div>

                    <div className={styles.automationList}>
                        {automationRules.map((rule) => (
                            <div key={rule.id} className={styles.automationCard}>
                                <div className={styles.ruleContent}>
                                    <strong>{rule.trigger}</strong>
                                    {rule.actions.map((action, idx) => (
                                        <span key={idx}>{action}</span>
                                    ))}
                                </div>
                                <div className={styles.cardStatusActions}>
                                    <span className={`${styles.ruleStatus} ${rule.active ? styles.active : styles.inactive}`}>
                                        {rule.active ? "Active" : "Inactive"}
                                    </span>
                                    <div className={styles.ruleActions}>
                                        <button onClick={() => handleEditRule(rule)} title="Edit" className={styles.ruleActionBtn}>✏️</button>
                                        <button onClick={() => handleDeleteRule(rule.id)} title="Delete" className={styles.ruleActionBtn}>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forecast Section */}
                <div className={styles.forecastSection}>
                    <div className={styles.forecastHeader}>
                        <h3><TrendingUp size={18} color="#16a34a" /> Deal Forecast</h3>
                        <p>Expected outcomes based on current progress</p>
                    </div>

                    <div className={styles.forecastCards}>
                        <div className={`${styles.forecastCard} ${styles.pinkForecast}`}>
                            <span>Total Pipeline</span>
                            <b>₹{forecastMetrics.totalValue.toLocaleString()}</b>
                        </div>

                        <div className={`${styles.forecastCard} ${styles.pinkForecast}`}>
                            <span>Deals in Progress</span>
                            <b>{forecastMetrics.dealCount}</b>
                        </div>

                        <div className={`${styles.forecastCard} ${styles.skyForecast}`}>
                            <span>Expected Revenue</span>
                            <b>₹{Math.round(forecastMetrics.expectedRevenue).toLocaleString()}</b>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Kanban Board Section */}
            <motion.div className={styles.kanbanBoard} variants={itemVariants}>
                {stages.map((stage) => (
                    <div key={stage.id} className={`${styles.kanbanColumn} ${styles[stage.id]}`}>
                        <div className={styles.columnHeader}>
                            <h3>{stage.title}</h3>
                            <span className={styles.countBadge}>{stage.deals.length}</span>
                        </div>
                        <div className={styles.cardContainer}>
                            {stage.deals.map((deal) => (
                                <motion.div
                                    key={deal.id}
                                    className={styles.card}
                                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
                                >
                                    <div className={styles.cardTop}>
                                        <strong className={styles.cardTitle}>{deal.title}</strong>
                                        <button className={styles.moreBtn}><MoreHorizontal size={14} /></button>
                                    </div>
                                    <span className={styles.pipelineCompany}>{deal.company}</span>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.value}>{deal.value}</span>
                                        <span className={styles.contact}>{deal.date}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Rule Modal */}
            {showRuleModal && (
                <div className={styles.modalOverlay} onClick={() => setShowRuleModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h3>{editingRuleId ? "Edit Rule" : "Add Automation Rule"}</h3>
                        <form onSubmit={handleSaveRule}>
                            <div className={styles.formGroup}>
                                <label>Trigger</label>
                                <input
                                    placeholder="e.g. When deal enters stage X"
                                    required
                                    value={ruleForm.trigger}
                                    onChange={e => setRuleForm({ ...ruleForm, trigger: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Actions (one per line)</label>
                                <textarea
                                    placeholder="e.g. Move to X"
                                    rows={3}
                                    required
                                    value={ruleForm.actions}
                                    onChange={e => setRuleForm({ ...ruleForm, actions: e.target.value })}
                                />
                            </div>
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    checked={ruleForm.active}
                                    onChange={e => setRuleForm({ ...ruleForm, active: e.target.checked })}
                                    id="ruleActive"
                                />
                                <label htmlFor="ruleActive">Active</label>
                            </div>
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setShowRuleModal(false)}>Cancel</button>
                                <button type="submit" className={styles.submitBtn}>Save Rule</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
