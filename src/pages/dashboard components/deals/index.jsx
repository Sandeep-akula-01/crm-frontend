import styles from "./deals.module.css";

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
