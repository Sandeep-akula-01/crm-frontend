import React, { useState } from "react";
import styles from "./nps.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";

export default function NPSFeedback({ onClose }) {
    const [score, setScore] = useState(null);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const getScoreColor = (s) => {
        if (s <= 6) return "#ef4444"; // Red (Detractors)
        if (s <= 8) return "#f59e0b"; // Yellow (Passives)
        return "#10b981"; // Green (Promoters)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        console.log("NPS Submitted:", { score, comment });
        setSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className={styles.modal}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>

                    {!submitted ? (
                        <div className={styles.content}>
                            <div className={styles.header}>
                                <div className={styles.iconCircle}>
                                    <Heart className={styles.heartIcon} size={24} fill="#ef4444" color="#ef4444" />
                                </div>
                                <h2 className={styles.title}>How are we doing?</h2>
                                <p className={styles.subtitle}>
                                    On a scale of 0-10, how likely are you to recommend Rvh CRM to a friend or colleague?
                                </p>
                            </div>

                            <div className={styles.scoreContainer}>
                                {scores.map((s) => (
                                    <button
                                        key={s}
                                        className={`${styles.scoreBtn} ${score === s ? styles.selected : ""}`}
                                        style={{
                                            "--hover-color": getScoreColor(s),
                                            "--active-color": getScoreColor(s)
                                        }}
                                        onClick={() => setScore(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.labels}>
                                <span>Not likely</span>
                                <span>Very likely</span>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label className={styles.label}>
                                    What is the main reason for your score? (Optional)
                                </label>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Tell us about your experience..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={score === null}
                                >
                                    <Send size={18} /> Send Feedback
                                </button>
                            </form>
                        </div>
                    ) : (
                        <motion.div
                            className={styles.successState}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className={styles.successIcon}>✨</div>
                            <h2 className={styles.successTitle}>Thank you!</h2>
                            <p className={styles.successSub}>
                                Your feedback helps us build a better CRM. We really appreciate your time!
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
