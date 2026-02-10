export interface CognitiveProfile {
  analytical: number;
  creative: number;
  strategic: number;
  empathetic: number;
  systematic: number;
  adaptive: number;
}

export interface CommunicationStyle {
  directness: number;
  formality: number;
  detail: number;
  warmth: number;
  persuasion: number;
  clarity: number;
}

export interface Agent {
  name: string;
  capability: string;
  tasks: string[];
  consistency: number;
  icon: string;
}

export interface WorkSample {
  title: string;
  type: "strategy" | "analysis" | "communication" | "planning" | "decision";
  score: number;
  summary: string;
  timeToComplete: string;
}

export interface BehaviourFingerprint {
  label: string;
  value: number;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  tagline: string;
  cognitive: CognitiveProfile;
  communication: CommunicationStyle;
  values: string[];
  workingStyle: string;
  decisionModel: string;
  creativeStyle: string;
  agents: Agent[];
  workSamples: WorkSample[];
  behaviourFingerprints: BehaviourFingerprint[];
  industryKnowledge: string[];
  osStrength: number;
  consistency: number;
}

export interface RoleOS {
  id: string;
  title: string;
  department: string;
  cognitive: CognitiveProfile;
  communication: CommunicationStyle;
  requiredValues: string[];
  autonomyLevel: number;
  agenticRequirements: string[];
}

export interface FitResult {
  candidateId: string;
  roleId: string;
  overallFit: number;
  cognitiveMatch: number;
  communicationMatch: number;
  collaborationAlignment: number;
  cognitiveDiversity: number;
  riskAreas: string[];
  strengths: string[];
  onboardingPrediction: string;
  potentialToPerform: number;
  dayOneReady: number;
  productivityLift: number;
  timeSaved: string;
}

export interface TeamMember {
  name: string;
  role: string;
  cognitive: CognitiveProfile;
  avatar: string;
}
