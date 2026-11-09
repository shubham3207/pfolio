/** Hero and About copy. Written in first person; edit freely. */

import { site } from "./site";

export const hero = {
  eyebrow: "Data analytics · Data engineering · Machine learning",
  /** Set line by line so the breaks stay deliberate at every width; the last line ends with `emphasis`. */
  headline: { lines: ["Making complex", "data useful, reliable,", "and"], emphasis: "meaningful." },
  intro:
    "I design and develop scalable data pipelines, predictive models, and analytical dashboards to solve real-world problems.",
  facts: [
    { label: "Currently", value: "MS Data Analytics, Clark University · graduating Dec 2026" },
    { label: "Previously", value: "Data Analyst, Corbig Technologies · 2022–2024" },
    { label: "Based in", value: site.location },
  ],
};

export const about = {
  statement: "From Kathmandu to Boston, from software to data.",
  paragraphs: [
    "I studied computing before I studied data, and it taught me to think in systems: how the pieces fit, where they break, and what keeps them dependable.",
    "At Corbig Technologies in Kathmandu, I spent over two years turning product data into dashboards and automated reporting. At Clark University, I now build end-to-end projects where data engineering, analysis and machine learning meet.",
  ],
  /** Broad working principles. Keep projects, tools and metrics out of these; the Projects section shows them. */
  principles: [
    { title: "Understand before building", text: "I start with the problem and the people it affects." },
    { title: "Keep it simple and reliable", text: "Clear work that keeps running beats clever work that runs once." },
    { title: "Make complexity understandable", text: "Findings only matter if others can act on them with confidence." },
  ],
};
