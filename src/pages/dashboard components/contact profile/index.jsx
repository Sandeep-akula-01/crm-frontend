import styles from "./contactProfile.module.css";

export default function ContactProfile({ contact, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.card}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <div className={styles.avatarBig}>{contact.name[0]}</div>
          <div>
            <h2>{contact.name}</h2>
            <p>{contact.company}</p>
          </div>
        </div>

        <div className={styles.info}>
          <div><span>Email</span><p>{contact.email}</p></div>
          <div><span>Phone</span><p>{contact.phone}</p></div>
          <div><span>Owner</span><p>{contact.owner}</p></div>
          <div><span>Status</span><p>{contact.status}</p></div>
          <div><span>Last Contact</span><p>{contact.lastContact}</p></div>
        </div>
      </div>
    </div>
  );
}

