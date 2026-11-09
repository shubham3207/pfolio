/**
 * Project case studies.
 * Figures here come from the resume and from the capstone notebook (final.ipynb).
 *
 * PLACEHOLDER LINKS: a `link.href` that points to example.com is a stand-in (the site
 * shows the GitHub profile instead). Replace it with the real URL and set isPlaceholder: false.
 */

export type ProjectGraphic = "wildfire" | "inflation" | "lending";

export type Project = {
  slug: string;
  graphic: ProjectGraphic;
  context: string;
  period: string;
  /** Short display name for the showcase; `title` remains the full name. */
  name: string;
  title: string;
  /** One sentence shown up front. */
  problem: string;
  /** Three or four headline technologies; the full list is in `stack`. */
  tech: string[];
  question: string;
  summary: string;
  approach: string[];
  findings: { figure: string; text: string }[];
  note?: string;
  stack: string[];
  link: { href: string; label: string; isPlaceholder: boolean };
};

export const projects: Project[] = [
  {
    slug: "california-wildfire",
    graphic: "wildfire",
    context: "Capstone practicum",
    period: "2026",
    name: "California Wildfire Prediction",
    title: "California Wildfire Prediction & Early Warning Pipeline",
    problem: "Which parts of California will see active fire tomorrow, and does fire history predict it better than weather?",
    tech: ["Python", "scikit-learn", "NASA FIRMS", "Streamlit"],
    question:
      "Can we tell a day ahead which parts of California are likely to see active fire, and does a place's fire history add anything beyond the weather?",
    summary:
      "I divided California into 1,060 cells of 20 km and built a complete daily record for each one from January 2019 to October 2026: just over three million cell-days joining NASA satellite fire detections, CAL FIRE perimeter history and NOAA station weather. The model estimates the chance that each cell has a satellite-detected fire the next day, and the system turns that into Watch and Warning levels.",
    approach: [
      "Engineered fire-weather signals (vapor pressure deficit, a hot-dry-windy index), neighboring-cell activity and fire trends from the raw feeds.",
      "Split strictly by time: trained on 2019–2023, tuned on 2024, and scored the 2025–2026 test period once at the end.",
      "Compared logistic regression, a decision tree, random forest, HistGradientBoosting and XGBoost against a simple “burning today, burning tomorrow” baseline.",
      "Packaged the final model in a Streamlit dashboard that pulls live FIRMS, CAL FIRE and National Weather Service data, with retries and last-good fallbacks.",
    ],
    findings: [
      {
        figure: "0.024",
        text: "PR-AUC from weather alone on the unseen test period, barely above the 1.4% base rate.",
      },
      {
        figure: "0.252",
        text: "PR-AUC once fire history was added, against 0.100 for the persistence baseline (ROC-AUC 0.90).",
      },
      {
        figure: "~10%",
        text: "of positives came from ten Sacramento Valley cells, mostly agricultural burns. I report this as a limitation, not a success.",
      },
    ],
    note: "Research prototype, not an official warning system. Fires are rare (about 1.5% of cell-days), so I judged models on precision-recall rather than accuracy.",
    stack: [
      "Python",
      "Pandas",
      "scikit-learn",
      "HistGradientBoosting",
      "Random Forest",
      "XGBoost",
      "NASA FIRMS",
      "CAL FIRE",
      "NOAA & NWS",
      "Streamlit",
      "pytest",
    ],
    link: {
      // PLACEHOLDER: replace with the project repository or write-up.
      href: "https://example.com/california-wildfire-project",
      label: "View project",
      isPlaceholder: true,
    },
  },
  {
    slug: "global-inflation",
    graphic: "inflation",
    context: "Data analytics project",
    period: "Sep – Dec 2025",
    name: "Global Inflation Analysis",
    title: "Global Inflation Analysis & Interactive Dashboard",
    problem: "How has inflation shifted across countries and decades, and when does a country break from its normal range?",
    tech: ["Python", "Apache Airflow", "AWS S3", "Plotly Dash"],
    question:
      "How have inflation patterns changed across countries and decades, and how can we tell when a country breaks sharply from its normal range?",
    summary:
      "Inflation shapes wages, savings and policy, but country-level data is scattered across sources and hard to compare. I pulled 25 years of consumer-price data from the World Bank and IMF, cleaned it into one consistent dataset, and built a dashboard for comparing countries and decades.",
    approach: [
      "Ingested CPI data for 2000–2024 from the World Bank and IMF REST APIs, cleaning 10,219 raw records into a 4,609-record, 13-variable dataset with moving averages and volatility measures.",
      "Used z-score anomaly detection to flag crisis periods instead of eyeballing outliers.",
      "Automated refreshes with a Dockerized Airflow DAG that lands data in Amazon S3, with GitHub Actions testing the DAG and building the image on every push.",
      "Built an interactive Plotly/Dash dashboard for comparing inflation trends across countries and decades.",
    ],
    findings: [
      {
        figure: "3",
        text: "crisis episodes flagged automatically: Venezuela, Zimbabwe and Argentina.",
      },
      {
        figure: "~40%",
        text: "higher average inflation in the 2020s than in prior decades.",
      },
      {
        figure: "~3×",
        text: "the volatility of earlier decades during the 2020s.",
      },
    ],
    stack: [
      "Python",
      "Pandas",
      "Plotly",
      "Dash",
      "Apache Airflow",
      "Docker",
      "AWS S3",
      "GitHub Actions",
      "World Bank API",
      "IMF API",
    ],
    link: {
      href: "https://global-inflation-analysis.onrender.com",
      label: "View live app",
      isPlaceholder: false,
    },
  },
  {
    slug: "lendingclub-default",
    graphic: "lending",
    context: "Machine learning project",
    period: "Jan – May 2026",
    name: "LendingClub Default Risk",
    title: "LendingClub Loan Default Prediction & Risk Segmentation",
    problem: "Which borrowers default, and does a loan’s grade capture that risk on its own?",
    tech: ["PySpark", "Databricks", "XGBoost", "Power BI"],
    question:
      "Which borrowers default, and does a loan’s assigned grade capture that risk on its own?",
    summary:
      "I built a PySpark pipeline on Databricks for 396,030 LendingClub loans, profiled defaults in SQL, and combined pattern mining, clustering and gradient boosting to see where the grading system misses risk.",
    approach: [
      "Ingested and cleaned the loan records in PySpark, narrowing 102 encoded features to the 23 strongest.",
      "Used association rule mining and KMeans/DBSCAN to find borrowers graded low-risk who still defaulted: medium interest rates, long credit histories.",
      "Benchmarked three models on a 79,206-loan holdout and explained the leader with SHAP in a Power BI dashboard.",
    ],
    findings: [
      {
        figure: "0.888",
        text: "AUC for XGBoost on the holdout, against a 0.797 baseline.",
      },
      {
        figure: "29.5%",
        text: "default rate for small-business loans, the highest of any purpose.",
      },
    ],
    stack: ["PySpark", "Databricks", "SQL", "Python", "XGBoost", "SHAP", "Power BI"],
    link: {
      href: "https://github.com/shubham3207/kdd",
      label: "Code on GitHub",
      isPlaceholder: false,
    },
  },
];
