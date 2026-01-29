import styles from "./deals.module.css";
import * as XLSX from "xlsx";


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


      {/* Deals Pipeline */}
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
      </div>



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
