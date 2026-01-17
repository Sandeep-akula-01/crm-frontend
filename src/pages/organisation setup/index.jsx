import React, { useState } from "react";
import styles from "./organisationSetup.module.css";
import { useNavigate } from "react-router-dom";


export default function OrganisationSetup() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});


    const [form, setForm] = useState({
        orgName: "",
        industry: "",
        size: "",
        country: "",
        state: "",
        city: "",
        inviteEmail: "",
        role: "User",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.orgName.trim()) newErrors.orgName = "Organization name is required";
        if (!form.industry) newErrors.industry = "Industry is required";
        if (!form.size) newErrors.size = "Company size is required";
        if (!form.country.trim()) newErrors.country = "Country is required";
        if (!form.state.trim()) newErrors.state = "State is required";
        if (!form.city.trim()) newErrors.city = "City is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;


        console.log("Org Data:", form);
        // later: send to backend
        navigate("/dashboard"); // future route
    };
    return (
        <>

            <div className={styles.wrapper}>
                <div className={styles.card}>
                    {/* Header */}
                    <div className={styles.header}>
                        <span className={styles.step}>Basic Setup</span>
                        <h1>Set up your organization</h1>
                        <p>This helps us personalize your CRM workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Company Details */}
                        <div className={styles.section}>
                            <h3>Company details</h3>

                            <div className={styles.grid}>
                                <div className={styles.inputGroup}>
                                    <label>Organization name  <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="orgName"
                                        placeholder="Acme Corp"
                                        value={form.orgName}
                                        onChange={handleChange}
                                    /* required */
                                    />
                                    {errors.orgName && <small style={{ color: "red" }}>{errors.orgName}</small>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Industry <span style={{ color: "red" }}>*</span></label>
                                    <select name="industry" value={form.industry} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option>Technology</option>
                                        <option>Finance</option>
                                        <option>Healthcare</option>
                                        <option>Education</option>
                                        <option>Retail</option>
                                    </select>
                                    {errors.industry && <small style={{ color: "red" }}>{errors.industry}</small>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Company size <span style={{ color: "red" }}>*</span></label>
                                    <select name="size" value={form.size} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option>1–10</option>
                                        <option>10–50</option>
                                        <option>50–200</option>
                                        <option>200+</option>
                                    </select>
                                    {errors.size && <small style={{ color: "red" }}>{errors.size}</small>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Country <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="country"
                                        placeholder="India"
                                        value={form.country}
                                        onChange={handleChange}
                                    />
                                    {errors.country && <small style={{ color: "red" }}>{errors.country}</small>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>State <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="state"
                                        placeholder="Telangana"
                                        value={form.state}
                                        onChange={handleChange}
                                    />
                                    {errors.state && <small style={{ color: "red" }}>{errors.state}</small>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>City / Branch <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        name="city"
                                        placeholder="Hyderabad"
                                        value={form.city}
                                        onChange={handleChange}
                                    />
                                    {errors.city && <small style={{ color: "red" }}>{errors.city}</small>}
                                </div>
                            </div>
                        </div>

                        {/* Team Basics */}
                        <div className={styles.section}>
                            <h3>Invite your first teammate (optional)</h3>
                            <div className={styles.inline}>
                                <input
                                    name="inviteEmail"
                                    placeholder="teammate@company.com"
                                    value={form.inviteEmail}
                                    onChange={handleChange}
                                />
                                <select name="role" value={form.role} onChange={handleChange}>
                                    <option>User</option>
                                    <option>Manager</option>
                                </select>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.footer}>
                            <button
                                className={styles.addLaterBtn}
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                style={{
                                    marginRight: "1rem",
                                    background: "transparent",
                                    border: "none",
                                    color: "#182d63",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                }}
                            >
                                Add later
                            </button>

                            <button type="submit" className={styles.createBtn}>
                                Create Workspace →
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}