import React, { useState, useEffect } from "react";
import styles from "./states.module.css";
import {
    MapPin,
    Plus,
    Trash2,
    ChevronRight,
    Search,
    X,
    Building2,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "crm_workspace_states";

const defaultStates = [
    {
        id: 1,
        name: "Telangana",
        description: "Southern Region Hub",
        branches: [
            { id: 101, name: "Hyderabad", manager: "Ravi Kumar" },
            { id: 102, name: "Warangal", manager: "Suresh P." }
        ],
        theme: "stateBlue"
    },
    {
        id: 2,
        name: "Karnataka",
        description: "IT & Tech Hub",
        branches: [
            { id: 201, name: "Bangalore", manager: "Anu Sharma" },
            { id: 202, name: "Mysore", manager: "Deepak S." }
        ],
        theme: "statePurple"
    }
];

export const States = () => {
    const [states, setStates] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultStates;
    });

    const [isAddingState, setIsAddingState] = useState(false);
    const [isAddingBranch, setIsAddingBranch] = useState(null); // stores state id
    const [searchTerm, setSearchTerm] = useState("");

    const [newState, setNewState] = useState({ name: "", description: "" });
    const [newBranch, setNewBranch] = useState({ name: "", manager: "" });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    }, [states]);

    const handleAddState = () => {
        if (!newState.name) return;
        const themes = ["stateBlue", "statePurple", "stateGreen", "stateOrange", "statePink"];
        const randomTheme = themes[states.length % themes.length];

        const stateObj = {
            id: Date.now(),
            name: newState.name,
            description: newState.description,
            branches: [],
            theme: randomTheme
        };

        setStates([...states, stateObj]);
        setIsAddingState(false);
        setNewState({ name: "", description: "" });
    };

    const handleAddBranch = (stateId) => {
        if (!newBranch.name) return;

        setStates(states.map(s => {
            if (s.id === stateId) {
                return {
                    ...s,
                    branches: [...s.branches, { id: Date.now(), name: newBranch.name, manager: newBranch.manager }]
                };
            }
            return s;
        }));

        setIsAddingBranch(null);
        setNewBranch({ name: "", manager: "" });
    };

    const handleDeleteState = (id) => {
        if (window.confirm("Are you sure you want to delete this state and all its branches?")) {
            setStates(states.filter(s => s.id !== id));
        }
    };

    const handleDeleteBranch = (stateId, branchId) => {
        setStates(states.map(s => {
            if (s.id === stateId) {
                return { ...s, branches: s.branches.filter(b => b.id !== branchId) };
            }
            return s;
        }));
    };

    const filteredStates = states.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.branches.some(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className={styles.container}>
            {/* Header Area */}
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1>States & Branches</h1>
                    <p>Manage your geographical organization and service centers</p>
                </div>
                <button className={styles.addBtn} onClick={() => setIsAddingState(true)}>
                    <Plus size={20} /> Add State
                </button>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <Globe size={18} className={styles.statIcon} />
                    <span><b>{states.length}</b> States</span>
                </div>
                <div className={styles.statItem}>
                    <Building2 size={18} className={styles.statIcon} />
                    <span><b>{states.reduce((acc, s) => acc + s.branches.length, 0)}</b> Branches</span>
                </div>
                <div className={styles.searchBox}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Find state or branch..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* States Grid */}
            <div className={styles.grid}>
                {filteredStates.map(state => (
                    <motion.div
                        layout
                        key={state.id}
                        className={`${styles.stateCard} ${styles[state.theme]}`}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconBox}>
                                <MapPin size={24} />
                            </div>
                            <div className={styles.cardTitles}>
                                <h2>{state.name}</h2>
                                <span>{state.description}</span>
                            </div>
                            <button className={styles.cardMenu} onClick={() => handleDeleteState(state.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className={styles.branchList}>
                            {state.branches.length === 0 ? (
                                <div className={styles.emptyBranches}>No branches yet</div>
                            ) : (
                                state.branches.map(branch => (
                                    <div key={branch.id} className={styles.branchRow}>
                                        <div className={styles.branchInfo}>
                                            <span className={styles.branchName}>{branch.name}</span>
                                            <span className={styles.branchManager}>{branch.manager}</span>
                                        </div>
                                        <button
                                            className={styles.miniDelete}
                                            onClick={() => handleDeleteBranch(state.id, branch.id)}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            className={styles.addBranchBtn}
                            onClick={() => setIsAddingBranch(state.id)}
                        >
                            <Plus size={16} /> Add Branch
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isAddingState && (
                    <div className={styles.modalOverlay} onClick={() => setIsAddingState(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={styles.modal}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h2>Add New State</h2>
                                <button onClick={() => setIsAddingState(false)}><X size={20} /></button>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.inputGroup}>
                                    <label>State Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Maharashtra"
                                        value={newState.name}
                                        onChange={(e) => setNewState({ ...newState, name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Short Description</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Western Hub"
                                        value={newState.description}
                                        onChange={(e) => setNewState({ ...newState, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.cancelLink} onClick={() => setIsAddingState(false)}>Cancel</button>
                                <button className={styles.submitBtn} onClick={handleAddState}>Create State</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isAddingBranch && (
                    <div className={styles.modalOverlay} onClick={() => setIsAddingBranch(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={styles.modal}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h2>Add Branch</h2>
                                <button onClick={() => setIsAddingBranch(null)}><X size={20} /></button>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.inputGroup}>
                                    <label>Branch Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Mumbai South"
                                        value={newBranch.name}
                                        onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Branch Manager</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Aditi Varma"
                                        value={newBranch.manager}
                                        onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.cancelLink} onClick={() => setIsAddingBranch(null)}>Cancel</button>
                                <button className={styles.submitBtn} onClick={() => handleAddBranch(isAddingBranch)}>Add Branch</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
