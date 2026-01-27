import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavLink, useNavigate } from "react-router-dom";


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

/* why us logos */
import dataIcon from "../../assets/data_icon.png";
import automationIcon from "../../assets/automation.png";
import analyticsIcon from "../../assets/sales.png";
import securityIcon from "../../assets/security.png";

/* features imgs */
import leadImg from "../../assets/leads.jpg";
import pipelineImg from "../../assets/pipelines.jpg";
import taskImg from "../../assets/tasks.jpg";
import teamImg from "../../assets/team.jpg";
import analyticsImg from "../../assets/analytics.jpg";
import integrationImg from "../../assets/integration.jpg";

/* testimonial images */
import p1 from "../../assets/pfp1.jpg";
import p2 from "../../assets/pfp2.jpg";
import p3 from "../../assets/pfp3.jpg";
import p4 from "../../assets/pfp4.jpg";


const FEATURES = [
    {
        title: "Lead Management",
        desc:
            "Capture, organize, and track leads from multiple sources in one centralized dashboard so no opportunity slips through.",
        img: leadImg,
    },
    {
        title: "Pipeline Tracking",
        desc:
            "Visualize your sales pipeline clearly and track deal progress at every stage with complete transparency.",
        img: pipelineImg,
    },
    {
        title: "Task & Reminder Automation",
        desc:
            "Automate follow-ups, reminders, and daily tasks to ensure timely actions and higher conversion rates.",
        img: taskImg,
    },
    {
        title: "Team Collaboration",
        desc:
            "Enable seamless collaboration across teams with shared notes, activity logs, and internal communication.",
        img: teamImg,
    },
    {
        title: "Analytics & Reports",
        desc:
            "Get real-time insights into sales performance, conversions, and trends using powerful analytics dashboards.",
        img: analyticsImg,
    },
    {
        title: "Email / WhatsApp Integration",
        desc:
            "Connect directly with customers via email and WhatsApp from inside your CRM for faster communication.",
        img: integrationImg,
    },
];


const TESTIMONIALS = [
    {
        text:
            "This CRM completely changed how our sales team works. Everything is organised and follow-ups are effortless.",
        name: "Aarav Sharma",
        role: "Sales Manager, FinEdge",
        img: p1,
    },
    {
        text:
            "The pipeline visibility and automation helped us close deals faster without extra manual work.",
        name: "Sanjana Rao",
        role: "Growth Lead, Marketly",
        img: p2,
    },
    {
        text:
            "Simple, clean, and powerful. Our team collaboration improved immediately after switching.",
        name: "Rehan Khan",
        role: "Founder, StartX",
        img: p3,
    },
    {
        text:
            "Analytics and reports give us clarity we never had before. Highly recommended for growing teams.",
        name: "Meghana Iyer",
        role: "Operations Head, CloudNest",
        img: p4,
    },
];


const plans = [
    {
        name: "Starter",
        price: "₹999",
        desc: "For individuals getting started",
        features: [
            "Lead management",
            "Basic analytics",
            "Email support",
            "2 team members",
            "Up to 1,000 contacts",
            "Basic pipeline management",
            "Standard support"
        ],
        featured: false,
    },
    {
        name: "Growth",
        price: "₹2,499",
        desc: "Best for growing teams",
        features: [
            "Everything in Starter",
            "Team collaboration",
            "Up to 10,000 contacts",
            "Advanced pipeline & automation",
            "Email campaigns & tracking",
            "Custom reports & dashboards",
            "API access",
            "Priority support"
        ],
        featured: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        desc: "For large scale operations",
        features: [
            "Unlimited users",
            "Custom integrations",
            "Dedicated manager",
            "Advanced AI insights",
            "Custom integrations",
            "SSO & advanced security",
            "Dedicated success manager",
            "24/7 premium support",
            "Custom training"
        ],
        featured: false,
        enterprise: true,
    },
];



export default function Home() {

    const navigate = useNavigate();

    const heroRef = useRef(null);
    const contentRef = useRef(null);

    const brandsRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const featuresRef = useRef(null);


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

    /* why us scroll */

    const { ref, inView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!inView) return;

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 150);

        return () => clearTimeout(timer);
    }, [inView]);



    /* features Scroll */
    useEffect(() => {
        const onScroll = () => {
            const section = featuresRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);

            const progress = totalScroll > 0 ? scrolled / totalScroll : 0;
            const index = Math.min(
                FEATURES.length - 1,
                Math.floor(progress * FEATURES.length)
            );

            setActiveIndex(index);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const activeFeature = FEATURES[activeIndex];



    return (
        <>

            {/* ---------- Navbar ------- */}
            <nav className={styles.navbar}>
                {/* Brand */}
                <div className={styles.navBrand}>
                    Rvh<span>Crm</span>
                </div>

                {/* Links */}
                <ul className={styles.navLinks}>
                    <li><NavLink to="/" className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`}>Home</NavLink></li>
                    <li><NavLink to="/features" className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`}>Features</NavLink></li>
                    <li><NavLink to="/pricing" className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`}>Pricing</NavLink></li>
                    <li> <NavLink to="/contact" className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`}>Contact</NavLink></li>
                    <li><NavLink to="/signUp" className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`}>Sign Up</NavLink></li>
                </ul>

            </nav>

            {/* ----- Header ---------- */}
            <section className={styles.hero} ref={heroRef}>
                {/* Background */}
                <div className={styles.gradientBg}></div>
                <div className={styles.whiteTint}></div>

                {/* SPARK GOES HERE */}
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


            {/* -------- WHY THIS CRM SECTION -----------*/}
            <section ref={ref} className={styles.whySection}>
                <div
                    className={`${styles.whyHeader} ${styles.revealBase} ${showContent ? styles.revealUp : ""
                        }`}
                >
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
                    <div
                        className={`${styles.whyImageWrap} ${styles.revealBase} ${styles.fromLeft} ${showContent ? styles.revealLeft : ""
                            }`}
                    >

                        <img src={whyUs} alt="CRM in action" />
                    </div>

                    {/* RIGHT CARDS */}
                    <div
                        className={`${styles.whyCards} ${styles.revealBase} ${styles.fromRight} ${showContent ? styles.revealRight : ""
                            }`}
                    >
                        <div className={styles.whyCard}>
                            <div className={styles.iconWrap}>
                                <img src={dataIcon} alt="Centralized data" />
                            </div>

                            <h4>Centralized customer data</h4>
                            <p>
                                Keep all leads, contacts, and conversations in one organized
                                dashboard.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.iconWrap}>
                                <img src={automationIcon} alt="Automation" />
                            </div>
                            <h4>Faster follow-ups & automation</h4>
                            <p>
                                Automate lead assignment, reminders, and follow-ups so no
                                opportunity is missed.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.iconWrap}>
                                <img src={analyticsIcon} alt="Analytics" />
                            </div>
                            <h4>Real-time sales insights</h4>
                            <p>
                                Track performance, conversions, and pipeline health with live
                                analytics.
                            </p>
                        </div>

                        <div className={styles.whyCard}>
                            <div className={styles.iconWrap}>
                                <img src={securityIcon} alt="Security" />
                            </div>
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


            {/* -------- Features ------- */}
            <section
                id="features-section"
                ref={featuresRef}
                className={styles.featuresSection}
            >

                {/* Heading */}
                <div className={styles.headingWrap}>
                    <h2>Core Features</h2>
                    <p>Everything you need to run your sales smarter and faster</p>
                </div>

                <div className={styles.featuresGrid}>
                    {/* LEFT – Topics */}
                    <div className={styles.topics}>
                        {FEATURES.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`${styles.topic} ${i === activeIndex ? styles.activeTopic : ""}`}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>

                    {/* RIGHT – Content Card */}
                    <div className={styles.cardWrap}>
                        <div className={styles.featureCard}>
                            <img src={activeFeature.img} alt={activeFeature.title} />

                            <div className={styles.cardContent}>
                                <h3>{activeFeature.title}</h3>
                                <p>{activeFeature.desc}</p>

                                <a
                                    className={styles.learnMore}
                                    onClick={() =>
                                        navigate("/features", {
                                            state: { feature: activeFeature.title },
                                        })
                                    }
                                >
                                    Learn more →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            {/* --------- Testimonials --------- */}
            <section className={styles.testimonialsSection}>

                <div className={styles.testimonialHeader}>
                    <span className={styles.label}>What people say</span>
                    <h2>Loved by teams that sell smarter</h2>
                    <p>
                        Trusted by fast-growing teams to improve productivity, collaboration,
                        and sales clarity.
                    </p>
                </div>

                {/* CAROUSEL */}
                <div className={styles.carouselOuter}>
                    <div className={styles.carouselTrack}>
                        {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
                            <div className={styles.testimonialCard} key={i}>
                                {/* stars */}
                                <div className={styles.stars}>★★★★★</div>

                                {/* text */}
                                <p className={styles.reviewText}>{item.text}</p>

                                {/* user */}
                                <div className={styles.userRow}>
                                    <img src={item.img} alt={item.name} />
                                    <div>
                                        <div className={styles.userName}>{item.name}</div>
                                        <div className={styles.userRole}>{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ---- Pricing ------ */}
            <section className={styles.pricingSection}>

                <div className={styles.headingWrap}>
                    <span className={styles.label}>Pricing</span>
                    <h2>
                        Simple pricing for <span>smart teams</span>
                    </h2>
                    <p>Choose a plan that scales as your business grows.</p>
                </div>

                {/* Cards */}
                <div className={styles.pricingGrid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${plan.featured ? styles.featured : ""
                                }`}
                        >
                            {plan.featured && (
                                <div className={styles.badge}>Most Popular</div>
                            )}

                            <h3>{plan.name}</h3>
                            <div className={styles.price}>{plan.price}
                                {!plan.enterprise && <span>/month</span>}
                            </div>
                            <p className={styles.desc}>{plan.desc}</p>

                            <ul className={styles.features}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✔ {feature}</li>
                                ))}
                            </ul>

                            <button
                                className={`${styles.cta} ${plan.featured ? styles.primary : ""
                                    }`}
                            >
                                {plan.enterprise ? "Contact Sales" : "Get Started"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---- Footer ------ */}
            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    {/* Left */}
                    <div className={styles.footerBrand}>
                        <h3>RvhCRM</h3>
                        <p>
                            A modern CRM built to help startups manage leads, teams, and growth —
                            all in one place.
                        </p>
                    </div>

                    {/* Links */}
                    <div className={styles.footerLinks}>
                        <div>
                            <h4>Product</h4>
                            <a onClick={() => navigate("/features")}>Features</a>
                            <a onClick={() => navigate("/pricing")}>Pricing</a>
                            <a onClick={() => navigate("/contact")}>Contact</a>
                            <a onClick={() => navigate("/login")}>Login</a>
                        </div>

                        <div>
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Blog</a>
                            <a href="#">Contact</a>
                        </div>

                        <div>
                            <h4>Support</h4>
                            <a href="#">Help Center</a>
                            <a href="#">Docs</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className={styles.footerBottom}>
                    © {new Date().getFullYear()} RvhCRM. All rights reserved.
                </div>
            </footer>

        </>
    );
}