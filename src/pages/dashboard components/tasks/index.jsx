import { useState } from "react";
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

  const [activeTab, setActiveTab] = useState("tasks");
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [files, setFiles] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);


  /* NOTES */
  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes([{ text: noteText, date: new Date().toLocaleString() }, ...notes]);
    setNoteText("");
  };

  /* FILES */
  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    setFiles([...uploaded, ...files]);
  };

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

      {/* TASK LIST 
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
      </div> */}

      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "tasks" ? styles.activeTab : ""}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>
        <button
          className={activeTab === "notes" ? styles.activeTab : ""}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
        <button
          className={activeTab === "files" ? styles.activeTab : ""}
          onClick={() => setActiveTab("files")}
        >
          Files
        </button>
      </div>

      {/* TASKS TAB (existing UI – untouched) */}
      {activeTab === "tasks" && (
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
      )}

      {/* NOTES TAB */}
      {/* NOTES TAB */}
      {activeTab === "notes" && (
        <div className={styles.panel}>
          <h3>Notes</h3>

          <div className={styles.noteInput}>
            <textarea
              placeholder="Write a quick note…"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
          </div>

          {notes.map((n, i) => (
            <div key={i} className={styles.noteCard}>
              {editingIndex === i ? (
                <>
                  <textarea
                    className={styles.editTextarea}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <div className={styles.noteActions}>
                    <button
                      onClick={() => {
                        const updated = [...notes];
                        updated[i].text = noteText;
                        setNotes(updated);
                        setEditingIndex(null);
                        setNoteText("");
                      }}
                    >
                      Save
                    </button>
                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{n.text}</p>
                  <span>{n.date}</span>

                  <div className={styles.noteActions}>
                    <button
                      onClick={() => {
                        setEditingIndex(i);
                        setNoteText(n.text);
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() =>
                        setNotes(notes.filter((_, index) => index !== i))
                      }
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}


      {/* FILES TAB */}

      {activeTab === "files" && (
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Files</h3>

          <div className={styles.fileUpload}>
            <input type="file" multiple onChange={handleFileUpload} />
            <span>Upload documents, images or PDFs</span>
          </div>

          <div className={styles.filesList}>
            {files.map((f, i) => (
              <div key={i} className={styles.fileRow}>
                <div className={styles.fileInfo}>
                  <span className={styles.fileIcon}>📄</span>
                  <span className={styles.fileName}>{f.name}</span>
                </div>

                <button
                  className={styles.deleteBtn}
                  onClick={() =>
                    setFiles(files.filter((_, index) => index !== i))
                  }
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}



    </div>
  );
}
