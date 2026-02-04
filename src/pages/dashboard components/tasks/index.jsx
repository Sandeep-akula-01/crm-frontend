import { useState, useEffect } from "react";
import axios from "axios";
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
  const [loadingNotes, setLoadingNotes] = useState(false);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);


  const [editingIndex, setEditingIndex] = useState(null);


  /* FILES */
  /* ----- FILES — BACKEND INTEGRATED */

  useEffect(() => {
    if (activeTab === "files") {
      fetchFiles();
    }
  }, [activeTab]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        "http://192.168.1.6:5000/api/files",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            entity_type: "lead",
            entity_id: 1, // same as upload
          },
        }
      );

      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files", err.response?.data || err);
    }
  };



 

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entity_type", "lead"); // or "note" / "deal"
      formData.append("entity_id", "1");      // TEMP — later dynamic

      try {
        const res = await axios.post(
          "http://192.168.1.6:5000/api/files",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // append uploaded file response to UI
        setFiles((prev) => [res.data, ...prev]);
      } catch (err) {
        console.error("File upload failed", err.response?.data || err);
      }
    }
  };







  /* NOTES */
  /* ---------- NOTES — BACKEND INTEGRATED */
  const addNote = async () => {
    if (!noteText.trim()) return;

    try {
      await axios.post(
        "http://192.168.1.6:5000/api/notes",
        { note: noteText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNoteText("");
      fetchNotes(); // ✅ refresh notes from backend
    } catch (err) {
      console.error("Failed to add note", err);
    }
  };


  /*----- Notes Backend --------*/
  useEffect(() => {
    if (activeTab === "notes") {
      fetchNotes();
    }
  }, [activeTab]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const api = axios.create({
        baseURL: "http://192.168.1.6:5000",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      const res = await axios.get(
        "http://192.168.1.6:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(res.data.notes || res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
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
                      onClick={async () => {
                        try {
                          const noteId = notes[i].id; // ✅ correct id

                          await axios.put(
                            `http://192.168.1.6:5000/api/notes/${noteId}`,
                            { note: noteText },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              },
                            }
                          );

                          // ✅ update locally
                          const updatedNotes = [...notes];
                          updatedNotes[i] = {
                            ...updatedNotes[i],
                            note: noteText,
                          };

                          setNotes(updatedNotes);
                          setEditingIndex(null);
                          setNoteText("");
                        } catch (err) {
                          console.error("Failed to update note", err);
                        }
                      }}
                    >
                      Save
                    </button>


                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{n.note}</p>
                  <span>{n.created_at}</span>


                  <div className={styles.noteActions}>
                    <button
                      onClick={() => {
                        setEditingIndex(i);
                        setNoteText(n.note);
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          const noteId = notes[i].id;
                          await axios.delete(
                            `http://192.168.1.6:5000/api/notes/${noteId}`,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              },
                            }
                          );

                          setNotes(notes.filter((_, index) => index !== i));
                        } catch (err) {
                          console.error("Failed to delete note");
                        }
                      }}
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

                  <span className={styles.fileName}>{f.file_name}</span>

                  {f.id && (
                    <button
                      onClick={async () => {
                        try {
                          const res = await axios.get(
                            `http://192.168.1.6:5000/api/files/${f.id}/download`,
                            {
                              responseType: "blob",
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                              },
                            }
                          );

                          const url = window.URL.createObjectURL(res.data);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = f.file_name;
                          a.click();
                          URL.revokeObjectURL(url);
                        } catch (err) {
                          console.error("Failed to download file", err);
                        }
                      }}
                    >
                      ⬇️
                    </button>
                  )}

                </div>


                {f.id && (
                  <button
                    className={styles.deleteBtn}
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://192.168.1.6:5000/api/files/${f.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                          }
                        );

                        setFiles(files.filter((_, index) => index !== i));
                      } catch (err) {
                        console.error("Failed to delete file", err);
                      }
                    }}
                  >
                    ❌
                  </button>
                )}


              </div>
            ))}
          </div>
        </div>
      )}



    </div>
  );
}
