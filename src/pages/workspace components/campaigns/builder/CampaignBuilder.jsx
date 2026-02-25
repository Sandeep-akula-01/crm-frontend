import React, { useState } from "react";
import styles from "./campaignBuilder.module.css";
import { X } from "lucide-react";

// ================= STEP 1: SCHEDULER =================
function SchedulerStep({ data, setData, next }) {
    return (
        <div className={styles.body}>
            <h3 className={styles.stepTitle}>When should this campaign go out?</h3>

            <div className={styles.radioGroup}>
                <label className={`${styles.radioLabel} ${data.sendType === "now" ? styles.active : ""}`}>
                    <input
                        type="radio"
                        className={styles.radioInput}
                        checked={data.sendType === "now"}
                        onChange={() => setData({ ...data, sendType: "now" })}
                    />
                    <div>
                        <div style={{ fontWeight: 600 }}>Send Now</div>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Broadcast immediately to selected audience</div>
                    </div>
                </label>

                <label className={`${styles.radioLabel} ${data.sendType === "later" ? styles.active : ""}`}>
                    <input
                        type="radio"
                        className={styles.radioInput}
                        checked={data.sendType === "later"}
                        onChange={() => setData({ ...data, sendType: "later" })}
                    />
                    <div>
                        <div style={{ fontWeight: 600 }}>Schedule for Later</div>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Pick a specific date and time</div>
                    </div>
                </label>
            </div>

            {data.sendType === "later" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className={styles.formGroup}>
                        <label>Date</label>
                        <input
                            type="date"
                            className={styles.input}
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Time</label>
                        <input
                            type="time"
                            className={styles.input}
                            value={data.time}
                            onChange={(e) => setData({ ...data, time: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup} style={{ gridColumn: "span 2" }}>
                        <label>Timezone</label>
                        <input className={styles.input} value="IST (India Standard Time)" disabled />
                    </div>
                </div>
            )}

            <div className={styles.footer} style={{ padding: 0, background: "transparent", border: "none", marginTop: "2rem" }}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={next}>
                    Continue
                </button>
            </div>
        </div>
    );
}

// ================= STEP 2: AUDIENCE =================
function AudienceStep({ data, setData, next, back }) {
    const audienceOptions = [
        { id: "all_active", label: "All Active Leads", desc: "Everyone currently in your pipeline" },
        { id: "hot_leads", label: "Hot Leads Only", desc: "Leads with score: High" },
        { id: "telangana", label: "Telangana Region", desc: "Leads located in Telangana state" },
        { id: "custom", label: "Custom Filter", desc: "Select specific tags or criteria" },
    ];

    return (
        <div className={styles.body}>
            <h3 className={styles.stepTitle}>Who are we targeting?</h3>

            <div className={styles.radioGroup}>
                {audienceOptions.map((opt) => (
                    <label key={opt.id} className={`${styles.radioLabel} ${data.audience_type === opt.id ? styles.active : ""}`}>
                        <input
                            type="radio"
                            className={styles.radioInput}
                            checked={data.audience_type === opt.id}
                            onChange={() => setData({ ...data, audience_type: opt.id })}
                        />
                        <div>
                            <div style={{ fontWeight: 600 }}>{opt.label}</div>
                            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{opt.desc}</div>
                        </div>
                    </label>
                ))}
            </div>

            <div className={styles.footer} style={{ padding: 0, background: "transparent", border: "none", marginTop: "2rem" }}>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={back}>Back</button>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={next}
                    disabled={!data.audience_type}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

// ================= STEP 3: EMAIL CONTENT =================
function EmailStep({ data, setData, next, back }) {
    return (
        <div className={styles.body}>
            <h3 className={styles.stepTitle}>Craft your message</h3>

            <div className={styles.formGroup}>
                <label>Subject Line</label>
                <input
                    className={styles.input}
                    placeholder="e.g. Exclusive Diwali Offer Just For You! 🎉"
                    value={data.email.subject}
                    onChange={(e) =>
                        setData({ ...data, email: { ...data.email, subject: e.target.value, isEdited: true } })
                    }
                />
            </div>

            <div className={styles.formGroup}>
                <label>Email Body</label>
                <textarea
                    className={styles.textarea}
                    placeholder="Hi {{name}}, we have something special for you..."
                    rows={10}
                    value={data.email.body}
                    onChange={(e) =>
                        setData({ ...data, email: { ...data.email, body: e.target.value, isEdited: true } })
                    }
                />
                <small style={{ color: "#6b7280", marginTop: "0.5rem", display: "block" }}>
                    You can use {"{{name}}"} and {"{{company}}"} as placeholders.
                </small>
            </div>

            <div className={styles.footer} style={{ padding: 0, background: "transparent", border: "none", marginTop: "2rem" }}>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={back}>Back</button>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={next}
                    disabled={!data.email.subject || !data.email.body}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

// ================= STEP 4: REVIEW & ACTIVATE =================
function ReviewStep({ data, back }) {
    return (
        <div className={styles.body}>
            <h3 className={styles.stepTitle}>Review & Activate</h3>

            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Communication Channel</span>
                    <span className={styles.summaryValue}>Email</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Target Audience</span>
                    <span className={styles.summaryValue}>{data.audience_type.replace("_", " ")}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Delivery Type</span>
                    <span className={styles.summaryValue}>
                        {data.sendType === "now" ? "Immediate Broadcast" : "Scheduled"}
                    </span>
                </div>
                {data.sendType === "later" && (
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Scheduled Time</span>
                        <span className={styles.summaryValue}>{data.date} at {data.time} (IST)</span>
                    </div>
                )}
                <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Subject Line</span>
                    <span className={styles.summaryValue}>{data.email.subject}</span>
                </div>
            </div>

            <div style={{ marginTop: "2rem", padding: "1.2rem", background: "#f5f3ff", borderRadius: "14px", border: "1px solid #ddd6fe" }}>
                <div style={{ fontSize: "0.875rem", color: "#5b21b6", fontWeight: 600, marginBottom: "0.5rem" }}>
                    Ready to launch?
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6d28d9" }}>
                    Once activated, the campaign will move to "Running" or "Scheduled" status and begin processing.
                </div>
            </div>

            <div className={styles.footer} style={{ padding: 0, background: "transparent", border: "none", marginTop: "2rem" }}>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={back}>Back</button>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => {
                        console.log("Activating Campaign:", data);
                        alert("Campaign Activated Successfully!");
                        // TODO: Call backend API here
                    }}
                >
                    Activate Campaign
                </button>
            </div>
        </div>
    );
}

// ================= MAIN CAMPAIGN BUILDER =================
export default function CampaignBuilder({ onClose, campaignName }) {
    const [step, setStep] = useState(1);
    const [campaignData, setCampaignData] = useState({
        sendType: "now",
        date: "",
        time: "",
        timezone: "IST",
        audience_type: "",
        email: {
            subject: "",
            body: "",
            isEdited: false,
        },
    });

    const STEP_LABELS = ["Schedule", "Audience", "Content", "Review"];

    const renderStep = () => {
        switch (step) {
            case 1: return <SchedulerStep data={campaignData} setData={setCampaignData} next={() => setStep(2)} />;
            case 2: return <AudienceStep data={campaignData} setData={setCampaignData} next={() => setStep(3)} back={() => setStep(1)} />;
            case 3: return <EmailStep data={campaignData} setData={setCampaignData} next={() => setStep(4)} back={() => setStep(2)} />;
            case 4: return <ReviewStep data={campaignData} back={() => setStep(3)} />;
            default: return null;
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>

                {/* ===== HEADER ===== */}
                <header className={styles.header}>
                    <div>
                        <h2>Campaign Builder</h2>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{campaignName || "Untitled Campaign"}</div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={18} />
                    </button>
                </header>

                {/* ===== STEP PROGRESS BAR ===== */}
                <div style={{ padding: "1rem 2rem", background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        {STEP_LABELS.map((label, i) => (
                            <div key={label} style={{ flex: 1, textAlign: "center" }}>
                                <div style={{
                                    height: "4px",
                                    background: i + 1 <= step ? "#6b5cff" : "#e5e7eb",
                                    borderRadius: "2px",
                                    marginBottom: "4px",
                                    transition: "background 0.3s ease"
                                }} />
                                <span style={{
                                    fontSize: "0.7rem",
                                    color: i + 1 <= step ? "#6b5cff" : "#9ca3af",
                                    fontWeight: i + 1 === step ? 700 : 500
                                }}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== ACTIVE STEP ===== */}
                {renderStep()}

            </div>
        </div>
    );
}
