import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { motion } from "framer-motion";

import whyUs from "../../assets/Why_us.jpg"; 

/* BRAND LOGOS */
import google from "../../assets/Chargebee_logo.png";
import amazon from "../../assets/Cleartax_logo.png";
import microsoft from "../../assets/Dunzo_logo.png";
import slack from "../../assets/Freshworks_logo.png";
import spotify from "../../assets/Inmobi_logo.png";
import netflix from "../../assets/Razorpay_logo.png";
import airbnb from "../../assets/Shopify_logo.png";
import uber from "../../assets/Spotify_logo.png";
import shopify from "../../assets/Udaan_logo.png";
import stripe from "../../assets/Zoho_logo.png";


export default function Home() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    const brandsRef = useRef(null);


    /* Header Animation variants */
    useEffect(() => {
        const reveals = document.querySelectorAll(`.${styles.reveal}`);

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);

                    }
                });
            },
            { threshold: 0.2 }
        );

        reveals.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []); 



    /* ===== Brands carousel ===== */
    const brands = [
        google,
        amazon,
        microsoft,
        slack,
        spotify,
        netflix,
        airbnb,
        uber,
        shopify,
        stripe,
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % brands.length);
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const visibleBrands = [...brands, ...brands].slice(index, index + 7);



    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.show);
                }
            },
            { threshold: 0.25 }
        );

        if (brandsRef.current) observer.observe(brandsRef.current);

        return () => observer.disconnect();
    }, []);



    return (
        <>
            <section className={styles.hero} ref={heroRef}>
                {/* Background */}
                <div className={styles.gradientBg}></div>
                <div className={styles.whiteTint}></div>

                {/* 🔥 SPARK GOES HERE */}
                <motion.div
                    className={styles.spark}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{
                        duration: 10,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                <svg className={styles.sparkPath} viewBox="0 0 400 400">
                    <path
                        d="M350 50 A300 300 0 0 1 350 350"
                        fill="none"
                    />
                </svg>


                {/*----- Hero Content ----- */}
                <div className={styles.heroContent} ref={contentRef}>
                    <h1 className={styles.reveal}>
                        Control Your <span>Leads</span>, Teams & Growth
                    </h1>

                    <p className={styles.reveal}>
                        A modern CRM built for startups and scaling businesses — automate
                        lead distribution, track performance, and grow with clarity.
                    </p>

                    <div className={`${styles.actions} ${styles.reveal}`}>
                        <button className={styles.primaryBtn}>Start Free Trial</button>
                        <button className={styles.secondaryBtn}>Watch Demo</button>
                    </div>

                    {/* Divider */}
                    <div className={`${styles.divider} ${styles.reveal}`}></div>

                    {/* Stats */}
                    <div className={`${styles.stats} ${styles.reveal}`}>
                        <div className={styles.statItem}>
                            <h3>10,000+</h3>
                            <span>Active Users</span>
                        </div>

                        <div className={styles.statItem}>
                            <h3>$2.5B</h3>
                            <span>Deals Closed</span>
                        </div>

                        <div className={styles.statItem}>
                            <h3>4.9/5</h3>
                            <span>Customer Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------ BRANDS ----- */}
            <section className={styles.brandsSection} ref={brandsRef}>

                <h2>
                    Trusted by <span>100+</span> companies worldwide
                </h2>

                <p className={styles.brandsDesc}>
                    Teams across fintech, SaaS, and enterprise trust our CRM to manage
                    leads, close deals faster, and scale with confidence.
                </p>

                <div className={styles.brandCarousel}>
                    {visibleBrands.map((logo, i) => (
                        <div
                            key={i}
                            className={`${styles.brandItem} ${i === 3 ? styles.activeBrand : ""
                                }`}
                        >
                            <img src={logo} alt="brand logo" />
                        </div>
                    ))}
                </div>
            </section>


            {/* WHY THIS CRM SECTION */}
            <section className={styles.whySection}>
                <div className={styles.whyHeader}>
                    <h2>
                        Why this <span>CRM?</span>
                    </h2>
                    <p>
                        Everything your team needs to manage leads, automate workflows,
                        and close deals — all in one place.
                    </p>
                </div>

                <div className={styles.whyContent}>
                    {/* LEFT IMAGE */}
                    <div className={styles.whyImageWrap}>
                        <img
                            src={whyUs}
                            alt="CRM in action"
                        />
                    </div>

                    {/* RIGHT CARDS */}
                    <div className={styles.whyCards}>
                        <div className={styles.whyCard}>
                            <div className={styles.icon}>📊</div>
                            <h4>Centralized customer data</h4>
                            <p>
                                Keep all leads, contacts, and conversations in one organized
                                dashboard.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.icon}>⚡</div>
                            <h4>Faster follow-ups & automation</h4>
                            <p>
                                Automate lead assignment, reminders, and follow-ups so no
                                opportunity is missed.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.icon}>📈</div>
                            <h4>Real-time sales insights</h4>
                            <p>
                                Track performance, conversions, and pipeline health with live
                                analytics.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.icon}>🔐</div>
                            <h4>Secure & scalable</h4>
                            <p>
                                Built to grow with your business, with enterprise-grade
                                security.
                            </p>
                        </div>

                        <button className={styles.demoBtn}>
                            Book a Live Demo →
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}