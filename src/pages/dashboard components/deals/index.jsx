import React, { useEffect, useState } from "react";
import styles from "./deals.module.css";
import * as XLSX from "xlsx";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* deals pipeline */
const dealsData = [
  {
    name: "CRM Setup",
    company: "Acme Corp",
    stage: "Proposal",
    value: "₹1,20,000",
    owner: "Varshini",
    close: "12 Feb",
  },
  {
    name: "Website Redesign",
    company: "Nova Labs",
    stage: "Won",
    value: "₹85,000",
    owner: "Ravi",
    close: "05 Feb",
  },
  {
    name: "Landing Page",
    company: "Pixel Studio",
    stage: "Negotiation",
    value: "₹45,000",
    owner: "Anu",
    close: "18 Feb",
  },
];

const salesData = [
  { name: "Mobile App", company: "Zen Corp", stage: "Proposal", value: "₹2,40,000", close: "22 Feb" },
  { name: "SEO Retainer", company: "Rankly", stage: "Negotiation", value: "₹60,000", close: "28 Feb" },
  { name: "Dashboard Revamp", company: "Finova", stage: "Won", value: "₹1,80,000", close: "10 Feb" },
];

const partnershipData = [
  { name: "Agency Tie-up", company: "DesignHub", stage: "Proposal", value: "—", close: "—" },
  { name: "Tech Partner", company: "CloudNine", stage: "Negotiation", value: "—", close: "—" },
  { name: "Referral Partner", company: "GrowthX", stage: "Won", value: "—", close: "—" },
];

const enterpriseData = [
  { name: "ERP System", company: "MegaCorp", stage: "Proposal", value: "₹12,00,000", close: "Mar" },
  { name: "Internal CRM", company: "Axis Group", stage: "Negotiation", value: "₹8,50,000", close: "Apr" },
  { name: "AI Platform", company: "OmniTech", stage: "Won", value: "₹18,00,000", close: "Jan" },
];



const winLossData = [
  { name: "Won", value: 52 },
  { name: "Lost", value: 33 },
  { name: "In Progress", value: 15 },
];

const WIN_LOSS_COLORS = ["#10b981", "#f97316", "#6366f1"];

const winReasons = [
  { label: "Pricing Fit", value: 35, color: "#10b981" }, // green
  { label: "Product Match", value: 25, color: "#3b82f6" }, // blue
  { label: "Fast Follow-up", value: 18, color: "#f97316" }, // orange
];

const lossReasons = [
  { label: "Budget Issues", value: 30, color: "#f97316" },
  { label: "Competitor Chosen", value: 22, color: "#ef4444" },
  { label: "Delayed Response", value: 15, color: "#6366f1" },
];


export default function Deals({ branch }) {
  const handleExportDeals = () => {
    const formattedData = dealsData.map((d) => ({
      Deal: d.name,
      Company: d.company,
      Stage: d.stage,
      Value: d.value,
      Owner: d.owner,
      "Close Date": d.close,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "deals.csv";
    link.click();

    URL.revokeObjectURL(url);
  };


  // ---------- Forecast logic ----------

  // convert ₹ strings to numbers
  const parseAmount = (value) =>
    Number(value.replace(/[₹,]/g, ""));

  // stage probabilities
  const STAGE_PROBABILITY = {
    proposal: 0.6,
    negotiation: 0.8,
    won: 1,
  };

  // total pipeline value
  const totalPipelineValue = dealsData.reduce(
    (sum, d) => sum + parseAmount(d.value),
    0
  );

  // expected (forecasted) revenue
  const expectedRevenue = dealsData.reduce((sum, d) => {
    const prob = STAGE_PROBABILITY[d.stage.toLowerCase()] || 0;
    return sum + parseAmount(d.value) * prob;
  }, 0);

  // deals closing this month (simple, readable)
  const dealsClosingThisMonth = dealsData.filter((d) =>
    d.close.toLowerCase().includes("feb")
  ).length;

  /* deals pipeline */
  const [activePipeline, setActivePipeline] = React.useState("deals");

  const pipelineMap = {
    deals: dealsData,
    sales: salesData,
    partnership: partnershipData,
    enterprise: enterpriseData,
  };

  const activeData = pipelineMap[activePipeline];




  return (
    <div className={styles.dealsPage}>

      {/* Top Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span>Total Value</span>
          <b>₹2.5L</b>
        </div>
        <div className={styles.statCard}>
          <span>Open Deals</span>
          <b>8</b>
        </div>
        <div className={styles.statCard}>
          <span>Won</span>
          <b>5</b>
        </div>
        <div className={styles.statCard}>
          <span>Lost</span>
          <b>2</b>
        </div>
      </div>

      {/* Export Deals */}
      <div className={styles.exportSection}>
        <div className={styles.exportText}>
          <h3>Export Deals</h3>
          <p>
            Download your deals data to analyze updates or share with your team.
          </p>
        </div>

        <button className={styles.exportBtn} onClick={handleExportDeals}>
          Export Deals
        </button>
      </div>


      {/* Deals Pipeline 
      <div className={styles.pipelineSection}>
        <h3 className={styles.pipelineTitle}>Deals Pipeline</h3>

        <div className={styles.pipelineBoard}>
          {["Proposal", "Negotiation", "Won"].map((stage) => (
            <div
              key={stage}
              className={`${styles.pipelineColumn} ${styles[stage.toLowerCase()]}`}
            >

              <div className={styles.pipelineHeader}>
                <span>{stage}</span>
                <b>{dealsData.filter(d => d.stage === stage).length}</b>
              </div>

              <div className={styles.pipelineCards}>
                {dealsData
                  .filter(d => d.stage === stage)
                  .map((deal, i) => (
                    <div key={i} className={styles.pipelineCard}>
                      <strong>{deal.name}</strong>
                      <span className={styles.pipelineCompany}>{deal.company}</span>

                      <div className={styles.pipelineMeta}>
                        <span>{deal.value}</span>
                        <span>{deal.close}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Pipelines Section */}
      <div className={styles.pipelineSection}>

        {/* Pipeline Tabs */}
        <div className={styles.pipelineTabs}>
          {[
            { id: "deals", label: "Deals Pipeline" },
            { id: "sales", label: "Sales Pipeline" },
            { id: "partnership", label: "Partnership" },
            { id: "enterprise", label: "Enterprise" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePipeline(tab.id)}
              className={`${styles.pipelineTab} ${activePipeline === tab.id ? styles.activeTab : ""
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SAME KANBAN – data swaps */}
        <div className={`${styles.pipelineBoardWrap} ${styles[activePipeline]}`}>
          <div className={styles.pipelineBoard}>
            {["Proposal", "Negotiation", "Won"].map(stage => (
              <div
                key={stage}
                className={`${styles.pipelineColumn} ${styles[stage]}`}

              >
                <div className={styles.pipelineHeader}>
                  <span>{stage}</span>
                  <b>{activeData.filter(d => d.stage === stage).length}</b>
                </div>

                <div className={styles.pipelineCards}>
                  {activeData
                    .filter(d => d.stage === stage)
                    .map((deal, i) => (
                      <div key={i} className={styles.pipelineCard}>
                        <strong>{deal.name}</strong>
                        <span className={styles.pipelineCompany}>{deal.company}</span>

                        <div className={styles.pipelineMeta}>
                          <span>{deal.value}</span>
                          <span>{deal.close}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* -------------- Win / Loss Analytics ----------------*/}
      <section className={styles.winLossSection}>
        <h3 className={styles.sectionTitle}>Win / Loss Analytics</h3>

        <div className={styles.winLossGrid}>

          {/* Donut Chart */}
          <div className={styles.chartBox}>

            <div className={styles.donutLegend}>
              <span>
                <i className={styles.wonDot}></i> Won
              </span>
              <span>
                <i className={styles.lostDot}></i> Lost
              </span>
              <span>
                <i className={styles.progressDot}></i> In Progress
              </span>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <PieChart>

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="wonGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#43cea2" />
                    <stop offset="100%" stopColor="#185a9d" />
                  </linearGradient>

                  <linearGradient id="lostGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff7e5f" />
                    <stop offset="100%" stopColor="#feb47b" />
                  </linearGradient>

                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6a11cb" />
                    <stop offset="100%" stopColor="#2575fc" />
                  </linearGradient>
                </defs>

                <Pie
                  data={winLossData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="url(#wonGradient)" />
                  <Cell fill="url(#lostGradient)" />
                  <Cell fill="url(#progressGradient)" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>


            <div className={styles.chartCenter}>
              <span>Deal Outcomes</span>
            </div>
          </div>

          {/* Insights */}

          <div className={styles.insightGrid}>

            {/* Win Card */}
            <div className={styles.insightCard}>
              <h4 className={styles.winTitle}>Top Win Reasons</h4>

              <ul className={styles.reasonList}>
                {winReasons.map((r, i) => (
                  <li key={i}>
                    <span className={styles.reasonLabel}>{r.label}</span>
                    <em className={styles.reasonValue}>{r.value}%</em>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loss Card */}
            <div className={styles.insightCard}>
              <h4 className={styles.lossTitle}>Top Loss Reasons</h4>

              <ul className={styles.reasonList}>
                {lossReasons.map((r, i) => (
                  <li key={i}>
                    <span className={styles.reasonLabel}>{r.label}</span>
                    <em className={styles.reasonValue}>{r.value}%</em>
                  </li>
                ))}
              </ul>
            </div>

          </div>


        </div>
      </section>




      {/* ---------- Forecast + Automation Row ---------- */}
      <div className={styles.insightsRow}>

        {/* ---------- Pipeline Automation ---------- */}
        {/* ---------- Pipeline Automation ---------- */}
        <div className={styles.automationSection}>
          <div className={styles.automationHeader}>
            <div>
              <h3>Pipeline Automation</h3>
              <p>Automated rules that manage deal movement and revenue</p>
            </div>

            <button className={styles.addRuleBtn} disabled>
              + Add Rule
            </button>
          </div>

          <div className={styles.automationList}>
            <div className={styles.automationCard}>
              <div className={styles.ruleIcon}></div>
              <div className={styles.ruleContent}>
                <strong>When deal is marked as “Won”</strong>
                <span>→ Move deal to Won stage</span>
                <span>→ Add amount to revenue forecast</span>
              </div>
              <span className={`${styles.ruleStatus} ${styles.active}`}>
                Active
              </span>
            </div>

            <div className={styles.automationCard}>
              <div className={styles.ruleIcon}></div>
              <div className={styles.ruleContent}>
                <strong>If no activity for 7 days</strong>
                <span>→ Mark deal as Stalled</span>
              </div>
              <span className={`${styles.ruleStatus} ${styles.active}`}>
                Active
              </span>
            </div>

            <div className={styles.automationCard}>
              <div className={styles.ruleIcon}></div>
              <div className={styles.ruleContent}>
                <strong>When status = “Proposal Sent”</strong>
                <span>→ Move deal to Proposal stage</span>
              </div>
              <span className={`${styles.ruleStatus} ${styles.inactive}`}>
                Inactive
              </span>
            </div>
          </div>

          <p className={styles.automationNote}>
            Automation rules are UI-only for demo purposes.
          </p>
        </div>

        {/* ---------- Deal Forecast ---------- */}
        {/* ---------- Deal Forecast ---------- */}
        <div className={styles.forecastSection}>
          <div className={styles.forecastHeader}>
            <h3>Deal Forecast</h3>
            <p>Expected revenue based on deal progress</p>
          </div>

          <div className={styles.forecastGrid}>
            {/* KPI Cards */}
            <div className={styles.forecastCards}>
              <div className={styles.forecastCard}>
                <span>Total Pipeline</span>
                <b>₹{totalPipelineValue.toLocaleString()}</b>
              </div>

              <div className={styles.forecastCard}>
                <span>Closing This Month</span>
                <b>{dealsClosingThisMonth}</b>
              </div>

              <div className={`${styles.forecastCard} ${styles.primary}`}>
                <span>Expected Revenue</span>
                <b>₹{expectedRevenue.toLocaleString()}</b>
              </div>
            </div>

          </div>
        </div>


      </div>




      {/* Deals Table */}
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>Deal</th>
              <th>Company</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Owner</th>
              <th>Close Date</th>
            </tr>
          </thead>
          <tbody>
            {dealsData.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.company}</td>
                <td>
                  <span className={`${styles.stage} ${styles[d.stage.toLowerCase()]}`}>
                    {d.stage}
                  </span>
                </td>
                <td>{d.value}</td>
                <td>{d.owner}</td>
                <td>{d.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
