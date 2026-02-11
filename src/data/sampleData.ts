import type { Candidate, RoleOS, FitResult, TeamMember } from "./types";

export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Elena Vasquez",
    role: "Strategy & Operations Lead",
    location: "London, UK",
    avatar: "EV",
    tagline: "Systems thinker who turns ambiguity into structured action",
    cognitive: {
      analytical: 92,
      creative: 74,
      strategic: 96,
      empathetic: 68,
      systematic: 88,
      adaptive: 81,
    },
    communication: {
      directness: 85,
      formality: 62,
      detail: 78,
      warmth: 70,
      persuasion: 88,
      clarity: 94,
    },
    values: [
      "Intellectual honesty",
      "Outcome over process",
      "Radical transparency",
      "First-principles thinking",
    ],
    workingStyle:
      "Deep-work blocks with async updates. Prefers written briefs over meetings. Structures problems into decision trees before execution.",
    decisionModel:
      "Evidence-weighted with a strong bias for speed. Uses pre-mortem analysis on high-stakes decisions. Comfortable deciding under uncertainty.",
    creativeStyle:
      "Structured creativity — generates options within frameworks, then stress-tests each one. Not chaotic creative, but reliably inventive.",
    agents: [
      {
        name: "StratBot",
        capability: "Market analysis & competitive positioning",
        tasks: [
          "Weekly competitor digest",
          "Pricing model analysis",
          "Market entry assessments",
        ],
        consistency: 94,
        icon: "📊",
      },
      {
        name: "BriefGen",
        capability: "Executive summary generation",
        tasks: [
          "Board pack summaries",
          "Investor update drafts",
          "Strategic memo creation",
        ],
        consistency: 91,
        icon: "📝",
      },
      {
        name: "DecisionForge",
        capability: "Decision framework builder",
        tasks: [
          "Option scoring matrices",
          "Risk/reward modelling",
          "Scenario planning",
        ],
        consistency: 89,
        icon: "⚖️",
      },
      {
        name: "ResearchPilot",
        capability: "Deep research & synthesis",
        tasks: [
          "Industry trend reports",
          "Academic paper synthesis",
          "Data-driven insight packs",
        ],
        consistency: 96,
        icon: "🔍",
      },
    ],
    workSamples: [
      {
        title: "Market entry strategy for Nordic expansion",
        type: "strategy",
        score: 94,
        summary:
          "Comprehensive 3-phase GTM plan with pricing sensitivity analysis, partner landscape mapping, and regulatory considerations.",
        timeToComplete: "47 min",
      },
      {
        title: "Q3 board pack executive summary",
        type: "communication",
        score: 91,
        summary:
          "Distilled 82-page board pack into 4-page narrative. Identified 3 key risk items the original pack undersold.",
        timeToComplete: "23 min",
      },
      {
        title: "Resource allocation under constraint",
        type: "decision",
        score: 88,
        summary:
          "Given budget cut scenario, produced a prioritised stack-rank with clear reasoning chains. Preserved 90% of projected impact.",
        timeToComplete: "31 min",
      },
      {
        title: "Competitive response to pricing disruption",
        type: "analysis",
        score: 96,
        summary:
          "Built scenario model across 4 competitor responses. Identified second-order effects most analysis missed.",
        timeToComplete: "52 min",
      },
    ],
    behaviourFingerprints: [
      {
        label: "Structured reasoning",
        value: 95,
        description: "Consistently breaks problems into component parts",
      },
      {
        label: "Bias for action",
        value: 87,
        description: "Moves to execution quickly once evidence threshold met",
      },
      {
        label: "Written-first",
        value: 92,
        description: "Defaults to written communication over verbal",
      },
      {
        label: "Intellectual rigour",
        value: 93,
        description: "Challenges assumptions including their own",
      },
      {
        label: "Async-native",
        value: 88,
        description:
          "Effective in distributed, async-first environments",
      },
    ],
    industryKnowledge: [
      "B2B SaaS",
      "Marketplace dynamics",
      "Fintech",
      "Platform strategy",
      "Pricing theory",
    ],
    osStrength: 93,
    consistency: 91,
  },
  {
    id: "c2",
    name: "Marcus Chen",
    role: "Product Designer",
    location: "Berlin, DE",
    avatar: "MC",
    tagline: "Design thinker who bridges user empathy with systems logic",
    cognitive: {
      analytical: 72,
      creative: 95,
      strategic: 78,
      empathetic: 93,
      systematic: 65,
      adaptive: 90,
    },
    communication: {
      directness: 68,
      formality: 45,
      detail: 82,
      warmth: 91,
      persuasion: 85,
      clarity: 88,
    },
    values: [
      "User obsession",
      "Craft over speed",
      "Inclusive by default",
      "Show don't tell",
    ],
    workingStyle:
      "Visual thinker. Sketches before wireframing. Prefers short sync sessions over long written specs. Works in iterative loops.",
    decisionModel:
      "Prototype-driven. Makes small bets to learn, then commits. Uses user signal heavily in trade-off decisions.",
    creativeStyle:
      "Divergent and prolific. Generates many options quickly, narrows through user testing rather than internal debate.",
    agents: [
      {
        name: "PixelMind",
        capability: "UI pattern research & component generation",
        tasks: [
          "Competitive UI audits",
          "Component library expansion",
          "Accessibility checks",
        ],
        consistency: 88,
        icon: "🎨",
      },
      {
        name: "UserLens",
        capability: "User research synthesis",
        tasks: [
          "Interview transcript analysis",
          "Sentiment clustering",
          "Journey map generation",
        ],
        consistency: 92,
        icon: "👁️",
      },
      {
        name: "FlowForge",
        capability: "Interaction flow design",
        tasks: [
          "User flow mapping",
          "Edge case identification",
          "Micro-interaction specs",
        ],
        consistency: 85,
        icon: "🔀",
      },
    ],
    workSamples: [
      {
        title: "Onboarding redesign for fintech app",
        type: "strategy",
        score: 92,
        summary:
          "Reduced onboarding drop-off from 34% to 12% through progressive disclosure and contextual help patterns.",
        timeToComplete: "38 min",
      },
      {
        title: "Design system component audit",
        type: "analysis",
        score: 89,
        summary:
          "Identified 23 redundant components, proposed consolidated set of 14 with improved accessibility scores.",
        timeToComplete: "44 min",
      },
      {
        title: "Stakeholder design review presentation",
        type: "communication",
        score: 86,
        summary:
          "Framed design decisions in business impact terms. Secured alignment from eng, product, and marketing in single session.",
        timeToComplete: "28 min",
      },
    ],
    behaviourFingerprints: [
      {
        label: "Visual reasoning",
        value: 96,
        description: "Thinks and communicates primarily through visual artefacts",
      },
      {
        label: "User empathy",
        value: 93,
        description: "Naturally centres decisions around user pain points",
      },
      {
        label: "Iterative approach",
        value: 91,
        description: "Comfortable with ambiguity, refines through feedback loops",
      },
      {
        label: "Cross-functional bridge",
        value: 84,
        description: "Translates design rationale into language each function understands",
      },
    ],
    industryKnowledge: [
      "Product design",
      "Design systems",
      "Fintech UX",
      "Accessibility",
      "Mobile-first design",
    ],
    osStrength: 89,
    consistency: 87,
  },
  {
    id: "c3",
    name: "Priya Sharma",
    role: "Data Science Lead",
    location: "Toronto, CA",
    avatar: "PS",
    tagline: "Translates complex data into decisions that move the needle",
    cognitive: {
      analytical: 97,
      creative: 62,
      strategic: 84,
      empathetic: 58,
      systematic: 95,
      adaptive: 73,
    },
    communication: {
      directness: 90,
      formality: 72,
      detail: 95,
      warmth: 55,
      persuasion: 76,
      clarity: 91,
    },
    values: [
      "Rigour over intuition",
      "Reproducibility",
      "Ethical AI",
      "Intellectual humility",
    ],
    workingStyle:
      "Methodical and documentation-heavy. Builds from first principles. Prefers structured code reviews and peer validation.",
    decisionModel:
      "Bayesian. Updates beliefs incrementally based on evidence. Won't commit to conclusions without sufficient sample size.",
    creativeStyle:
      "Methodical exploration — varies parameters systematically rather than brainstorming. Innovation through rigour.",
    agents: [
      {
        name: "DataForge",
        capability: "Automated EDA & feature engineering",
        tasks: [
          "Dataset profiling",
          "Feature importance analysis",
          "Anomaly detection",
        ],
        consistency: 97,
        icon: "📈",
      },
      {
        name: "ModelSmith",
        capability: "Model selection & hyperparameter tuning",
        tasks: [
          "Benchmark comparisons",
          "Cross-validation pipelines",
          "Model card generation",
        ],
        consistency: 95,
        icon: "🔧",
      },
      {
        name: "InsightWriter",
        capability: "Technical report generation",
        tasks: [
          "Analysis narratives",
          "Methodology documentation",
          "Stakeholder translations",
        ],
        consistency: 90,
        icon: "📄",
      },
    ],
    workSamples: [
      {
        title: "Customer churn prediction model",
        type: "analysis",
        score: 96,
        summary:
          "Built gradient-boosted model achieving 0.89 AUC. Identified 3 previously unknown churn indicators saving £2.4M annually.",
        timeToComplete: "56 min",
      },
      {
        title: "A/B test design for pricing experiment",
        type: "planning",
        score: 93,
        summary:
          "Designed multi-arm bandit experiment with power analysis. Accounted for seasonality and network effects.",
        timeToComplete: "34 min",
      },
      {
        title: "Data quality assessment for acquisition target",
        type: "decision",
        score: 91,
        summary:
          "Audited 14 data sources. Identified critical gaps that changed the acquisition valuation by 15%.",
        timeToComplete: "48 min",
      },
    ],
    behaviourFingerprints: [
      {
        label: "Evidence-driven",
        value: 98,
        description: "Will not make claims without supporting data",
      },
      {
        label: "Methodical precision",
        value: 95,
        description: "Documents methodology before executing analysis",
      },
      {
        label: "Intellectual humility",
        value: 88,
        description: "Actively seeks to disprove own hypotheses",
      },
      {
        label: "Technical depth",
        value: 94,
        description: "Goes deeper than surface-level on technical problems",
      },
    ],
    industryKnowledge: [
      "Machine learning",
      "Statistical inference",
      "Python/R ecosystem",
      "Data engineering",
      "MLOps",
    ],
    osStrength: 94,
    consistency: 93,
  },
];

export const roles: RoleOS[] = [
  {
    id: "r1",
    title: "Head of Strategy",
    department: "Executive",
    cognitive: {
      analytical: 90,
      creative: 75,
      strategic: 95,
      empathetic: 65,
      systematic: 80,
      adaptive: 85,
    },
    communication: {
      directness: 85,
      formality: 70,
      detail: 75,
      warmth: 60,
      persuasion: 90,
      clarity: 90,
    },
    requiredValues: [
      "First-principles thinking",
      "Outcome over process",
      "Radical transparency",
    ],
    autonomyLevel: 90,
    agenticRequirements: [
      "Market analysis",
      "Competitive intelligence",
      "Strategic planning",
      "Executive communication",
    ],
  },
  {
    id: "r2",
    title: "Senior Product Designer",
    department: "Product",
    cognitive: {
      analytical: 70,
      creative: 90,
      strategic: 75,
      empathetic: 90,
      systematic: 65,
      adaptive: 85,
    },
    communication: {
      directness: 65,
      formality: 45,
      detail: 80,
      warmth: 85,
      persuasion: 80,
      clarity: 85,
    },
    requiredValues: [
      "User obsession",
      "Craft over speed",
      "Inclusive by default",
    ],
    autonomyLevel: 80,
    agenticRequirements: [
      "UI research",
      "Prototyping",
      "User research synthesis",
      "Design system management",
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "James Wright",
    role: "CEO",
    cognitive: {
      analytical: 78,
      creative: 82,
      strategic: 94,
      empathetic: 74,
      systematic: 65,
      adaptive: 91,
    },
    avatar: "JW",
  },
  {
    name: "Sarah Okonkwo",
    role: "VP Product",
    cognitive: {
      analytical: 85,
      creative: 78,
      strategic: 88,
      empathetic: 82,
      systematic: 76,
      adaptive: 84,
    },
    avatar: "SO",
  },
  {
    name: "David Kim",
    role: "Engineering Lead",
    cognitive: {
      analytical: 94,
      creative: 65,
      strategic: 72,
      empathetic: 60,
      systematic: 96,
      adaptive: 70,
    },
    avatar: "DK",
  },
  {
    name: "Anna Petrov",
    role: "Head of Marketing",
    cognitive: {
      analytical: 68,
      creative: 92,
      strategic: 80,
      empathetic: 88,
      systematic: 62,
      adaptive: 86,
    },
    avatar: "AP",
  },
];

function computeFit(candidateId: string, roleId: string): FitResult {
  const candidate = candidates.find((c) => c.id === candidateId)!;
  const role = roles.find((r) => r.id === roleId)!;

  const cogKeys = Object.keys(candidate.cognitive) as Array<
    keyof typeof candidate.cognitive
  >;
  const cogMatch =
    100 -
    cogKeys.reduce(
      (sum, k) => sum + Math.abs(candidate.cognitive[k] - role.cognitive[k]),
      0
    ) /
      cogKeys.length;

  const comKeys = Object.keys(candidate.communication) as Array<
    keyof typeof candidate.communication
  >;
  const comMatch =
    100 -
    comKeys.reduce(
      (sum, k) =>
        sum + Math.abs(candidate.communication[k] - role.communication[k]),
      0
    ) /
      comKeys.length;

  const valueOverlap = candidate.values.filter((v) =>
    role.requiredValues.includes(v)
  ).length;
  const valueScore = (valueOverlap / role.requiredValues.length) * 100;

  const diversityScores = cogKeys.map((k) =>
    Math.abs(candidate.cognitive[k] - 75)
  );
  const cogDiversity =
    diversityScores.reduce((a, b) => a + b, 0) / diversityScores.length;

  const overall = Math.round(cogMatch * 0.3 + comMatch * 0.25 + valueScore * 0.25 + candidate.osStrength * 0.2);

  return {
    candidateId,
    roleId,
    overallFit: Math.min(overall, 98),
    cognitiveMatch: Math.round(cogMatch),
    communicationMatch: Math.round(comMatch),
    collaborationAlignment: Math.round((comMatch + valueScore) / 2),
    cognitiveDiversity: Math.round(cogDiversity),
    riskAreas:
      valueOverlap < 2
        ? ["Value misalignment may cause friction in team culture"]
        : cogMatch < 75
        ? ["Cognitive profile diverges significantly from role requirements"]
        : [],
    strengths:
      cogMatch > 85
        ? [
            "Strong cognitive alignment with role demands",
            "Thinking patterns match the problem types this role encounters",
          ]
        : [
            "Brings fresh cognitive perspective to the team",
            "Communication style complements existing team",
          ],
    onboardingPrediction:
      overall > 85
        ? "Fast ramp — productive within 2 weeks"
        : overall > 70
        ? "Standard ramp — productive within 4–6 weeks"
        : "Extended ramp — needs structured onboarding support",
    potentialToPerform: Math.min(Math.round(overall * 1.05), 99),
    dayOneReady: Math.round(overall * 0.92),
    productivityLift: Math.round(candidate.agents.length * 12 + candidate.osStrength * 0.3),
    timeSaved: `${Math.round(candidate.agents.length * 6)}hrs/week`,
  };
}

export const fitResults: FitResult[] = [
  computeFit("c1", "r1"),
  computeFit("c2", "r2"),
  computeFit("c3", "r1"),
  computeFit("c2", "r1"),
  computeFit("c1", "r2"),
];

export function getFitForCandidate(
  candidateId: string,
  roleId: string
): FitResult | undefined {
  return fitResults.find(
    (f) => f.candidateId === candidateId && f.roleId === roleId
  );
}
