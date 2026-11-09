/**
 * Experience and education as one chronological timeline, taken from the resume.
 * Every figure below appears in the resume bullet named beside it; keep it that way.
 * Add a new role or degree by adding an entry in date order.
 */

export type Highlight = { area: string; metric: string; text: string };

export type Milestone = {
  kind: "work" | "education";
  start: string;
  end: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  /** Short factual note, e.g. GPA. */
  detail?: string;
  /** `area` names the transferable skill the contribution shows. */
  highlights?: Highlight[];
  tools?: string[];
  /** Marks the milestone that is still in progress. */
  current?: boolean;
};

export const timeline: Milestone[] = [
  {
    kind: "education",
    start: "Sep 2020",
    end: "Aug 2023",
    title: "BSc (Hons) in Computing",
    organization: "Coventry University",
    location: "Coventry, UK",
    summary: "Foundations in programming and systems thinking.",
  },
  {
    kind: "work",
    start: "Aug 2022",
    end: "Nov 2024",
    title: "Data Analyst",
    organization: "Corbig Technologies",
    location: "Kathmandu, Nepal",
    summary:
      "I wrote the SQL and Python behind weekly reporting, built the dashboards teams used, and analyzed usage to help product and engineering decide what to build.",
    highlights: [
      {
        // Resume: "Automated recurring extraction, cleaning, transformation, and reporting across 8 weekly reports … eliminating 10 hours of manual data prep per week."
        area: "Automation",
        metric: "10 hours a week",
        text: "of manual prep cut by automating 8 weekly reports in Python, pandas and SQL.",
      },
      {
        // Resume: "Developed Power BI dashboards … giving 1,500+ students and product and engineering teams self-serve access to the data."
        area: "Dashboards",
        metric: "1,500+ students",
        text: "plus product and engineering teams given self-serve Power BI dashboards.",
      },
      {
        // Resume: "Analyzed 50,000+ student and application records … guiding engagement improvements that increased weekly active students by 8%."
        area: "Analysis",
        metric: "+8% weekly actives",
        text: "after engagement changes guided by my analysis of 50,000+ records.",
      },
    ],
    tools: ["Python", "SQL", "pandas", "Power BI"],
  },
  {
    kind: "education",
    start: "Jan 2025",
    end: "Expected Dec 2026",
    title: "MS in Data Analytics",
    organization: "Clark University",
    location: "Worcester, MA",
    summary:
      "End-to-end projects in wildfire prediction, credit risk and global inflation.",
    detail: "GPA 3.87",
    current: true,
  },
];
