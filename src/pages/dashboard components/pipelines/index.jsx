import React, { useState, useMemo } from "react";
import { Plus, MoreHorizontal, Zap, TrendingUp, DollarSign, Target, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./pipelines.module.css";

const stagesData = [
    {
        title: "New Lead",
        count: 4,
        deals: [
            { id: 1, title: "Acme Corp Expansion", contact: "John Doe", value: "₹2,50,000" },
            { id: 2, title: "Global Tech Integration", contact: "Jane Smith", value: "₹4,80,000" },
        ]
    },
    {
        title: "Qualified",
        count: 2,
        deals: [
            { id: 3, title: "Nexus Software License", contact: "Mike Ross", value: "₹1,20,000" },
        ]
    },
    {
        title: "Proposal",
        count: 3,
        deals: [
            { id: 4, title: "Skyline Cloud Migration", contact: "Harvey Specter", value: "₹8,50,000" },
        ]
    },
    {
        title: "Negotiation",
        count: 1,
        deals: [
            { id: 5, title: "Infinite Loop R&D", contact: "Steve Jobs", value: "₹12,00,000" },
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
        const STAGE_PROBS = { "New Lead": 0.2, "Qualified": 0.4, "Proposal": 0.6, "Negotiation": 0.8 };
        const expectedRevenue = stages.reduce((sum, stage) => {
            const prob = STAGE_PROBS[stage.title] || 0.1;
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
