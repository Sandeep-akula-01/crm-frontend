import { useState } from "react";
import styles from "./contact.module.css";


export default function Contact() {


    return (
        <>


            <div className={styles.contactSection}>

                {/* LEFT SIDE */}
                <div className={styles.contactLeft}>
                    <h2 className={styles.contactTitle}>Contact Us</h2>
                    <p className={styles.contactDesc}>
                        We'd love to hear from you. Reach out with any questions, ideas, or collaboration opportunities.
                    </p>

                    <div className={styles.contactInfo}>
                        <p><strong>Email:</strong> contact@workspace.com</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Address:</strong> Hyderabad, India</p>
                    </div>
                </div>   {/* ✅ LEFT CLOSED HERE */}

                {/* RIGHT SIDE */}
                <div className={styles.contactCard}>
                    <h3 className={styles.cardHeading}>Get in Touch</h3>

                    <form className={styles.contactForm}>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <textarea placeholder="Your Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

            </div>






        </>
    )

}