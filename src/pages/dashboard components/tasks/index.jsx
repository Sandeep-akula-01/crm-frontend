import styles from "./tasks.module.css";

const tasks = [
  {
    title: "Follow up with Riya Sharma",
    related: "Lead · Instagram",
    priority: "High",
    due: "Today",
    owner: "Varshini",
    done: false,
  },
  {
    title: "Send proposal to Acme Corp",
    related: "Deal · CRM Setup",
    priority: "Medium",
    due: "Tomorrow",
    owner: "Ravi",
    done: false,
  },
  {
    title: "Demo call with Nova Labs",
    related: "Deal · Website Redesign",
    priority: "High",
    due: "Jan 26",
    owner: "Anu",
    done: false,
  },
  {
    title: "Internal review meeting",
    related: "Team Task",
    priority: "Low",
    due: "Completed",
    owner: "Varshini",
    done: true,
  },
];

export default function Tasks() {
  return (
    <div className={styles.tasksPage}>

      {/* OVERVIEW */}
      <div className={styles.taskStats}>
        <div className={styles.statCard}>
          <span>Today</span>
          <b>3</b>
        </div>
        <div className={styles.statCard}>
          <span>Upcoming</span>
          <b>5</b>
        </div>
        <div className={styles.statCard}>
          <span>Overdue</span>
          <b>1</b>
        </div>
        <div className={styles.statCard}>
          <span>Completed</span>
          <b>8</b>
        </div>
      </div>

      {/* TASK LIST */}
      <div className={styles.taskList}>
        <h3>My Tasks</h3>

        {tasks.map((t, i) => (
          <div key={i} className={`${styles.taskRow} ${t.done ? styles.done : ""}`}>
            <input type="checkbox" defaultChecked={t.done} />

            <div className={styles.taskInfo}>
              <strong>{t.title}</strong>
              <span>{t.related}</span>
            </div>

            <span className={`${styles.priority} ${styles[t.priority.toLowerCase()]}`}>
              {t.priority}
            </span>

            <span className={styles.due}>{t.due}</span>

            <span className={styles.owner}>{t.owner}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
