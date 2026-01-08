import styles from "./pricing.module.css";

const plans = [
    {
        name: "Starter",
        price: "₹999",
        desc: "For individuals getting started",
        features: [
            "Lead management",
            "Basic pipeline",
            "Tasks & reminders",
            "Email support",
        ],
        featured: false,
    },
    {
        name: "Growth",
        price: "₹2,499",
        desc: "Best for growing teams",
        features: [
            "Everything in Starter",
            "Automation workflows",
            "Team collaboration",
            "Analytics & reports",
            "Email & WhatsApp integration",
        ],
        featured: true,
    },
    {
        name: "Pro / Business",
        price: "₹4,999",
        desc: "For scaling sales teams",
        features: [
            "Everything in Growth",
            "Advanced analytics",
            "Role-based access",
            "API access",
            "Priority support",
        ],
        featured: false,
    },
];

export default function Pricing() {
    return (
        <>
            {/* Simple Hero */}
            <section className={styles.simpleHeroWrapper}>
                <div className={styles.simpleHeroOverlay} />

                <div className={styles.simpleHeroContent}>
                    <h1>Built for teams that want to sell smarter</h1>
                    <p>
                        RVH CRM helps you capture leads, manage follow-ups, and close deals —
                        without complexity.
                    </p>
                </div>
            </section>



            {/* ----- Pricing ----- */}
            <section className={styles.pricingSection}>

                <div className={styles.headingWrap}>
                    <span className={styles.label}>Simple & Transparent Pricing</span>
                    <h2>Plans that grow with your business</h2>
                    <p>No hidden fees. Upgrade or cancel anytime.</p>
                </div>

                {/* Pricing Cards */}
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
                            <p className={styles.desc}>{plan.desc}</p>

                            <div className={styles.price}>
                                {plan.price}
                                <span>/month</span>
                            </div>

                            <ul className={styles.features}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✔ {feature}</li>
                                ))}
                            </ul>

                            <button className={styles.cta}>Get Started</button>
                        </div>
                    ))}
                </div>

                <p className={styles.testimonial}>
                    “We switched to this CRM and closed deals 30% faster.”
                </p>
            </section>


            {/* ----- Who it's for ----- */}
            <section className={styles.whoItsForSection}>
                <div className={styles.whoItsForHeader}>
                    <h2>Built for teams that hate messy sales tools</h2>
                    <p>
                        Whether you’re just starting out or scaling fast, RVH CRM adapts to how
                        your team sells.
                    </p>
                </div>

                <div className={styles.whoItsForGrid}>
                    <div className={styles.whoItsForCard}>
                        <h3>Startups</h3>
                        <p className={styles.pain}>
                            Juggling leads across sheets, emails, and DMs.
                        </p>
                        <p className={styles.solution}>
                            One clean CRM to capture and track every opportunity.
                        </p>
                    </div>

                    <div className={styles.whoItsForCard}>
                        <h3>Sales Teams</h3>
                        <p className={styles.pain}>
                            Losing follow-ups and visibility across pipelines.
                        </p>
                        <p className={styles.solution}>
                            Centralized pipelines with automation and reminders.
                        </p>
                    </div>

                    <div className={styles.whoItsForCard}>
                        <h3>Agencies</h3>
                        <p className={styles.pain}>
                            Managing multiple clients and deals at once.
                        </p>
                        <p className={styles.solution}>
                            Separate pipelines and insights for every client.
                        </p>
                    </div>

                    <div className={styles.whoItsForCard}>
                        <h3>Growing Businesses</h3>
                        <p className={styles.pain}>
                            Tools that don’t scale with increasing sales volume.
                        </p>
                        <p className={styles.solution}>
                            A CRM that grows with your process — not against it.
                        </p>
                    </div>
                </div>
            </section>


        </>
    );
}
