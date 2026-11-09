/**
 * Skills grouped by the kind of work they support.
 * Every entry appears on the resume or in a project on this site (the wildfire capstone adds
 * gradient boosting, random forests, Streamlit and pytest). Names use each project's official
 * capitalization (pandas, scikit-learn, pytest). `tools` are software; `methods` are techniques.
 */

/**
 * `logo` is a file in /public/logos (see CREDITS.txt): a bare name means `<name>.svg`; include the
 * extension for other formats (e.g. "xgboost.png"). Leave it out to show a neutral dot instead.
 */
export type Tool = { name: string; logo?: string };

export type SkillGroup = {
  title: string;
  tools: Tool[];
  methods?: string[];
};

export const skillsIntro = "A practical toolkit built through engineering, analytics, and applied machine learning.";

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Analytics",
    tools: [
      { name: "Python", logo: "python" },
      { name: "SQL", logo: "sql" },
      { name: "pandas", logo: "pandas" },
      { name: "NumPy", logo: "numpy" },
      { name: "Excel", logo: "excel" },
    ],
    methods: ["Exploratory data analysis", "Time-series analysis", "Anomaly detection"],
  },
  {
    title: "Machine Learning",
    tools: [
      { name: "scikit-learn", logo: "scikitlearn" },
      { name: "XGBoost", logo: "xgboost.png" },
      { name: "SHAP", logo: "shap.png" },
    ],
    methods: ["Gradient boosting", "Random forests", "Clustering (k-means, DBSCAN)", "Association rule mining"],
  },
  {
    title: "Data Engineering",
    tools: [
      { name: "Apache Spark (PySpark)", logo: "apachespark" },
      { name: "Databricks", logo: "databricks" },
      { name: "Apache Airflow", logo: "apacheairflow" },
      { name: "PostgreSQL", logo: "postgresql" },
    ],
    methods: ["ETL pipelines", "REST API ingestion", "Data wrangling"],
  },
  {
    title: "Cloud & Development",
    tools: [
      { name: "AWS (S3)", logo: "amazonwebservices" },
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
      { name: "GitHub Actions (CI/CD)", logo: "githubactions" },
      { name: "pytest", logo: "pytest" },
    ],
  },
  {
    title: "Data Visualization",
    tools: [
      { name: "Power BI", logo: "powerbi" },
      // Dash is Plotly's framework, so one entry and one mark.
      { name: "Plotly & Dash", logo: "plotly" },
      { name: "Streamlit", logo: "streamlit" },
    ],
  },
];
