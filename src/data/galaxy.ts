export type Team = {
  slug: string;
  name: string;
  charter: string;
  aors: string[];
};

export const teams: Team[] = [
  {
    slug: "mx",
    name: "Mobile Experience",
    charter:
      "We craft seamless mobile experiences that connect people to what matters. Our mission is to push the boundaries of usability, performance, and delight across devices. We align design and engineering to deliver features at galaxy scale with uncompromising quality. Every release brings us closer to frictionless, human-centered mobility.",
    aors: [
      "Own the mobile app design system and UI foundations",
      "Ship quarterly feature releases with reliability SLAs",
      "Maintain cross-device performance budgets and metrics",
      "Partner with Platform on accessibility and localization",
    ],
  },
  {
    slug: "semiconductor",
    name: "Semiconductor Systems",
    charter:
      "We architect the invisible engines that power the future. Our mission is precision, efficiency, and resilience in every silicon pathway. We build scalable platforms that transform complexity into reliability. Our work turns pioneering research into product advantage.",
    aors: [
      "Coordinate SoC roadmaps and IP integration",
      "Own build/test automation for silicon bring-up",
      "Publish performance benchmarks and power targets",
      "Enable partner teams with reference designs",
    ],
  },
  {
    slug: "design-lab",
    name: "Design Lab",
    charter:
      "We discover the human stories behind every interface. Our mission is to translate insight into elegant, intuitive systems. We prototype boldly, test rigorously, and scale only what resonates. Clarity, craft, and care guide everything we make.",
    aors: [
      "Run monthly usability studies and publish insights",
      "Maintain the brand component library",
      "Lead cross-team design critiques and workshops",
      "Partner with MX on motion and micro-interactions",
    ],
  },
];

export type Training = {
  id: string;
  title: string;
  date: string; // ISO date
  host: string; // team slug
  eligibility: "All" | "Managers" | "Engineers" | "New Hires";
};

export const trainings: Training[] = [
  { id: "t1", title: "Designing for Delight", date: "2025-09-08", host: "design-lab", eligibility: "All" },
  { id: "t2", title: "Silicon CI/CD Deep Dive", date: "2025-09-12", host: "semiconductor", eligibility: "Engineers" },
  { id: "t3", title: "Mobile Perf Budgets 101", date: "2025-09-15", host: "mx", eligibility: "All" },
  { id: "t4", title: "Leadership Roundtable", date: "2025-09-20", host: "mx", eligibility: "Managers" },
  { id: "t5", title: "Prototyping at Speed", date: "2025-09-22", host: "design-lab", eligibility: "New Hires" },
];
