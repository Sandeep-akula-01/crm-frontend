import { useState } from "react";
import styles from "./contact.module.css";
import { useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "What are the temple opening and closing timings?",
        answer:
            "The temple typically opens early in the morning for Suprabhata Seva and closes after Ekantha Seva at night. Exact timings may vary on festival days.",
    },
    {
        question: "How can I book darshan tickets?",
        answer:
            "You can book darshan slots online through the temple’s official website or at designated counters. Advance booking is recommended to avoid long queues.",
    },
    {
        question: "Can I participate in temple sevas?",
        answer:
            "Yes. Devotees can sponsor or attend sevas like Suprabhata Seva, Kalyanotsavam, Tiruppavada Seva, and more. Some require prior booking.",
    },
    {
        question: "Is my donation eligible for tax exemption?",
        answer:
            "Yes, donations made to registered temple trusts may be eligible under Section 80G of the Income Tax Act. Receipts are provided.",
    },
    {
        question: "Can I volunteer at the temple?",
        answer:
            "Yes. Volunteers can assist with food service, crowd management, cleanliness, and festival preparations. Registration may be required.",
    },
];

export default function Contact() {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.logo}>🛕 Govindaraja Swamy Temple</div>

                {/* Hamburger */}
                <div
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <ul
                    className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
                    onClick={() => setMenuOpen(false)} // closes menu when any link is clicked
                >
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>About</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/darshan"); }}>Darshan</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/events"); }}>Events</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/seva"); }}>Seva</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/donate"); }}>Donate</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>Contact</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Login</a></li>
                </ul>
            </nav>


            {/* Contact Deatils 
            <section className={styles.contactSection}>
                <h2 className={styles.contactHeading}>Contact Us</h2>
                <div className={styles.contactDetails}>
                    <p><strong>Phone:</strong> +91 98491 02997</p>
                    <p><strong>Email:</strong> govindharajaswamy.temple@gmail.com</p>
                    <p><strong>Address:</strong> Sri Govindaraja Swamy Devasthanam
                        Jagadgiri Gutta, <br /> Hyderabad – 500037, Telangana, India.</p>
                </div>
            </section>  */}


            {/* Contact Deatils & Maps */}
            <section className={styles.contactSection}>
                <h2 className={styles.contactHeading}>Contact Us</h2>

                <div className={styles.contactDetails}>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> info@templetrust.org</p>
                    <p>
                        <strong>Address:</strong> Sri Govindaraja Swamy Devasthanam Jagadgiri Gutta,
                        Hyderabad – 500037, Telangana, India.
                    </p>
                </div>

                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.032770504631!2d78.42290237521307!3d17.505949033401617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d277bfe391%3A0x752ae56e9d98efd0!2zU1JJIEdPVklOREhBUkFKQSBTV0FNWSBURU1QTEUsIOCwtuCxjeCwsOCxgCDgsJfgsYvgsLXgsL_gsILgsKbgsLDgsL7gsJwg4LC44LGN4LC14LC-4LCu4LC_IOCwpuCxh-CwteCwuOCxjeCwpeCwvuCwqOCwgg!5e0!3m2!1sen!2sin!4v1761904588071!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className={styles.map}
                    ></iframe>
                </div>
            </section>


            {/* Form */}
            <section className={styles.contactFormSection}>
                <h2 className={styles.formHeading}>Contact Us</h2>

                <form className={styles.contactForm}>
                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" placeholder="Type your message..." required></textarea>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Send Message</button>
                </form>
            </section>


            {/* FAQ's */}

            <section className={styles.faqSection}>
                <h2 className={styles.heading}>Temple FAQs</h2>

                <div className={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <div
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""
                                }`}
                            key={index}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className={styles.question}>
                                <h3>{faq.question}</h3>
                                <span>{activeIndex === index ? "−" : "+"}</span>
                            </div>
                            {activeIndex === index && (
                                <p className={styles.answer}>{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>


            {/* Footer Section */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    {/* Sec 1 */}
                    <div className={styles.footerSection}>
                        <h3>Sri Govindaraja Swamy Devasthanam</h3>
                        <p>
                            A sacred Vaishnavite temple dedicated to Lord Vishnu, known for its
                            rich heritage, divine rituals, and spiritual significance. Visit for
                            darshan, poojas, and to experience eternal blessings.
                        </p>
                    </div>
                    {/* Sec 2 */}
                    <div className={styles.footerSection}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>Pooja Bookings</li>
                            <li>Donations</li>
                            <li>Volunteer Registration</li>
                            <li>Live Events</li>
                            <li>Online Seva</li>
                        </ul>
                    </div>
                    {/* Sec 3 */}
                    <div className={styles.footerSection}>
                        <h3>Live Pooja Bookings</h3>
                        <ul>
                            <li>Abhishekam Seva</li>
                            <li>Vishesha Pooja</li>
                            <li>Archana Seva</li>
                        </ul>
                    </div>
                    {/* Sec 4 */}
                    <div className={styles.footerSection}>
                        <h3>Contact Us</h3>
                        <p>
                            Sri Govindaraja Swamy Devasthanam <br />
                            Jagadgiri Gutta, Hyderabad – 500037, Telangana, India.
                        </p>
                        <p>☎️ 098491 02997</p>
                        <p>📧 govindharajaswamy.temple@gmail.com</p>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© 2025 Sri Govindaraja Swamy Devasthanam Foundation | All Rights Reserved | Future Invo Solutions</p>
                </div>
            </footer>

            
        </>
    )

}