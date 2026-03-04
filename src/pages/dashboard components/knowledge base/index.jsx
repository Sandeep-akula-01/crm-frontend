import React, { useState } from "react";
import styles from "./knowledgeBase.module.css";
import {
    Search,
    BookOpen,
    ChevronRight,
    Clock,
    User,
    ArrowLeft,
    ThumbsUp,
    ThumbsDown,
    Paperclip,
    Tag,
    Plus,
    Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CATEGORIES = [
    { id: "all", name: "All Articles", icon: <Layout size={18} /> },
    { id: "getting-started", name: "Getting Started", icon: <BookOpen size={18} /> },
    { id: "pipelines", name: "Pipelines & Deals", icon: <Layout size={18} /> },
    { id: "automations", name: "Workflows & Automations", icon: <Clock size={18} /> },
    { id: "account", name: "Account & Billing", icon: <User size={18} /> },
];

const MOCK_ARTICLES = [
    {
        id: "art-1",
        title: "How to set up your first Sales Pipeline",
        category: "pipelines",
        summary: "Learn the basics of creating pipelines, stages, and moving deals through the funnel.",
        author: "Priya Mehta",
        updatedAt: "Mar 02, 2026",
        content: `
            <h3>Understanding Pipelines</h3>
            <p>Pipelines in Rvh CRM help you visualize your sales process from lead generation to closing a deal. Each stage represents a milestone in your customer's journey.</p>
            
            <h3>Step 1: Create a New Pipeline</h3>
            <p>Navigate to <b>Workspace > Pipelines</b> and click on 'New Pipeline'. Give it a name that fits your workflow (e.g., 'Direct Sales' or 'Real Estate').</p>
            
            <h3>Step 2: Define Your Stages</h3>
            <p>Standard stages include Prospecting, Qualification, Proposal, Negotiation, and Closed Won/Lost. You can customize these at any time.</p>
            
            <p>Remember to regularly update deal status to keep your reporting accurate!</p>
        `,
        tags: ["Beginner", "Setup", "Sales"],
        attachments: ["Pipeline_Guide.pdf"]
    },
    {
        id: "art-2",
        title: "Automating Follow-up Tasks",
        category: "automations",
        summary: "Save time by setting up automation rules that trigger when a lead enters a specific stage.",
        author: "Arjun Sharma",
        updatedAt: "Feb 28, 2026",
        content: `
            <h3>Automation Basics</h3>
            <p>Automations are the brain center of your CRM. They use 'Triggers' and 'Actions' to handle repetitive tasks.</p>
            
            <h3>Creating a Rule</h3>
            <p>Go to <b>Workspace > Automation</b>. Click 'Create Rule'. Choose a trigger like 'Lead Created' and an action like 'Assign to Branch'.</p>
        `,
        tags: ["Automation", "Efficiency"],
        attachments: []
    },
    {
        id: "art-3",
        title: "Configuring Branch Locations",
        category: "account",
        summary: "A guide for administrators to add and manage different branch offices across states.",
        author: "Varshini",
        updatedAt: "Feb 25, 2026",
        content: `<h3>Administrator Guide</h3><p>Manage your organizational structure by defining branches. Each branch can have its own manager and team leads.</p>`,
        tags: ["Admin", "Org Setup"],
        attachments: ["Branch_Map.xlsx"]
    },
    {
        id: "art-4",
        title: "Importing Leads from CSV",
        category: "getting-started",
        summary: "Quickly migrate your existing data into Rvh CRM using our bulk import tool.",
        author: "Ravi Teja",
        updatedAt: "Mar 01, 2026",
        content: `<h3>Data Migration</h3><p>Ensure your CSV headers match our system fields for a smooth import process.</p>`,
        tags: ["Data", "Migration"],
        attachments: ["Template.csv"]
    },
    {
        id: "art-5",
        title: "Advanced Pipeline Automation",
        category: "pipelines",
        summary: "Take your workflow to the next level with conditional stages and weighted forecasts.",
        author: "Priya Mehta",
        updatedAt: "Mar 03, 2026",
        content: `<h3>Advanced Workflows</h3><p>Manage high-volume deals using automated probability updates and custom criteria for stage progression.</p>`,
        tags: ["Advanced", "Sales"],
        attachments: []
    },
    {
        id: "art-6",
        title: "Managing Large Teams and Permissions",
        category: "account",
        summary: "Learn how to define roles, restrict visibility, and manage organizational hierarchies.",
        author: "Arjun Sharma",
        updatedAt: "Mar 01, 2026",
        content: `<h3>Roles & Permissions</h3><p>Assign specific permissions to managers and users to maintain data security and focus.</p>`,
        tags: ["Roles", "Security"],
        attachments: []
    },
    {
        id: "art-7",
        title: "Reporting Dashboard Customization",
        category: "getting-started",
        summary: "Customize your overview cards to track the metrics that matter most to your business.",
        author: "Varshini",
        updatedAt: "Feb 27, 2026",
        content: `<h3>Custom Reporting</h3><p>Rearrange your dashboard KPI cards and choose which metrics to highlight on your homepage.</p>`,
        tags: ["Reporting", "UI"],
        attachments: []
    }
];

export default function KnowledgeBase() {
    const [view, setView] = useState("list"); // "list" | "detail"
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [feedback, setFeedback] = useState(null); // "yes" | "no" | null

    const filteredArticles = MOCK_ARTICLES.filter(art => {
        const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || art.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setView("detail");
        setFeedback(null);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setView("list");
        setSelectedArticle(null);
    };

    if (view === "detail" && selectedArticle) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.container}
            >
                {/* Breadcrumbs */}
                <nav className={styles.breadcrumbs}>
                    <button onClick={handleBack} className={styles.backLink}>
                        <ArrowLeft size={16} /> Back to Help Center
                    </button>
                    <span className={styles.separator}>/</span>
                    <span className={styles.crumb}>
                        {MOCK_CATEGORIES.find(c => c.id === selectedArticle.category)?.name}
                    </span>
                    <span className={styles.separator}>/</span>
                    <span className={styles.activeCrumb}>{selectedArticle.title}</span>
                </nav>

                <div className={styles.detailLayout}>
                    <article className={styles.articleBody}>
                        <h1 className={styles.articleTitle}>{selectedArticle.title}</h1>

                        <div className={styles.articleMeta}>
                            <div className={styles.authorInfo}>
                                <div className={styles.authorAvatar}>
                                    {selectedArticle.author[0]}
                                </div>
                                <div>
                                    <div className={styles.authorName}>{selectedArticle.author}</div>
                                    <div className={styles.updatedAt}>Last updated: {selectedArticle.updatedAt}</div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={styles.articleText}
                            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                        />

                        {selectedArticle.attachments.length > 0 && (
                            <div className={styles.attachmentsSection}>
                                <h4 className={styles.sectionTitle}>
                                    <Paperclip size={16} /> Attachments
                                </h4>
                                <div className={styles.attachmentList}>
                                    {selectedArticle.attachments.map(file => (
                                        <div key={file} className={styles.attachmentItem}>
                                            <span>{file}</span>
                                            <button className={styles.downloadBtn}>Download</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.tagsSection}>
                            {selectedArticle.tags.map(tag => (
                                <span key={tag} className={styles.tagPill}>
                                    <Tag size={12} /> {tag}
                                </span>
                            ))}
                        </div>

                        <div className={styles.feedbackSection}>
                            <p>Was this article helpful?</p>
                            <div className={styles.feedbackBtns}>
                                <button
                                    className={`${styles.feedbackBtn} ${feedback === 'yes' ? styles.activeFeedback : ''}`}
                                    onClick={() => setFeedback('yes')}
                                >
                                    <ThumbsUp size={18} /> Yes
                                </button>
                                <button
                                    className={`${styles.feedbackBtn} ${feedback === 'no' ? styles.activeFeedback : ''}`}
                                    onClick={() => setFeedback('no')}
                                >
                                    <ThumbsDown size={18} /> No
                                </button>
                            </div>
                            {feedback && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={styles.feedbackThanks}
                                >
                                    Thanks for your feedback!
                                </motion.p>
                            )}
                        </div>
                    </article>

                    <aside className={styles.detailSidebar}>
                        <div className={styles.sidebarSection}>
                            <h4 className={styles.sidebarHeading}>Related Articles</h4>
                            <div className={styles.relatedList}>
                                {MOCK_ARTICLES.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                                    .slice(0, 5).map(ra => (
                                        <div
                                            key={ra.id}
                                            className={styles.relatedCard}
                                            onClick={() => handleArticleClick(ra)}
                                        >
                                            <h5 className={styles.relatedCardTitle}>{ra.title}</h5>
                                            <p className={styles.relatedCardSummary}>{ra.summary}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Search Header */}
            <div className={styles.header}>
                <h1 className={styles.mainTitle}>How can we help?</h1>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Search for articles, guides, and more..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={styles.adminAction}>
                    <button className={styles.createBtn}>
                        <Plus size={18} /> Create Article
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className={styles.contentBody}>
                {/* Category Sidebar */}
                <aside className={styles.categorySidebar}>
                    {MOCK_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.catItem} ${activeCategory === cat.id ? styles.catActive : ""}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span className={styles.catIcon}>{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </aside>

                {/* Article Grid */}
                <main className={styles.articleMain}>
                    <div className={styles.grid}>
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map(art => (
                                <motion.div
                                    key={art.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className={styles.articleCard}
                                    onClick={() => handleArticleClick(art)}
                                >
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardCategory}>
                                            {MOCK_CATEGORIES.find(c => c.id === art.category)?.name}
                                        </div>
                                    </div>
                                    <h3 className={styles.cardTitle}>{art.title}</h3>
                                    <p className={styles.cardSummary}>{art.summary}</p>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.readMore}>
                                            Read More <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className={styles.emptyResults}>
                            <h3>No articles found</h3>
                            <p>Try searching for something else or browse categories.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}