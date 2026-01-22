import styles from "./Reports.module.css";

export default function Reports() {
  return (
    <div className={styles.reportsPage}>

      {/* KPI CARDS */}
      <div className={styles.reportStats}>
        <div className={styles.statCard}>
          <span>Total Leads</span>
          <b>1,284</b>
        </div>
        <div className={styles.statCard}>
          <span>Conversion Rate</span>
          <b>24%</b>
        </div>
        <div className={styles.statCard}>
          <span>Revenue</span>
          <b>₹ 12.4L</b>
        </div>
        <div className={styles.statCard}>
          <span>Active Deals</span>
          <b>32</b>
        </div>
      </div>

      {/* CHARTS */}
      <div className={styles.chartsRow}>

        {/* LEADS TREND */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Leads Trend</h3>
            <span>Last 6 Months</span>
          </div>

          <div className={styles.trendGraph}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points="0,70 20,60 40,65 60,45 80,38 100,30"
                fill="none"
                stroke="#6b5cff"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className={styles.months}>
            <span>Aug</span><span>Sep</span><span>Oct</span>
            <span>Nov</span><span>Dec</span><span>Jan</span>
          </div>
        </div>

        {/* SOURCES */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Lead Sources</h3>
            <span>Top Channels</span>
          </div>

          <div className={styles.sourcesList}>
            <div>
              <span className={styles.dot} />
              Instagram Ads
              <b>32%</b>
            </div>
            <div>
              <span className={styles.dot} />
              Website Forms
              <b>41%</b>
            </div>
            <div>
              <span className={styles.dot} />
              Email Campaigns
              <b>18%</b>
            </div>
            <div>
              <span className={styles.dot} />
              Referrals
              <b>9%</b>
            </div>
          </div>
        </div>

      </div>

      {/* INSIGHTS */}
      <div className={styles.insights}>
        <h3>Insights</h3>

        <ul>
          <li>
            Website Forms generate the highest quality leads with
            <strong> 41% contribution</strong>.
          </li>
          <li>
            Conversion rate improved by <strong>6%</strong> compared to last month.
          </li>
          <li>
            Instagram Ads performance dropped slightly in the last 2 weeks.
          </li>
        </ul>
      </div>

    </div>
  );
}
