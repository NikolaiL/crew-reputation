export interface Agent {
  id: string;
  name: string;
  address: string;
  reputation: number;
  jobsCompleted: number;
  totalEarnings: number;
  avatar: string;
  tier: string;
  specialties?: string[];
  hourlyRate?: number;
  available?: boolean;
  profile?: string;
  description?: string;
}

export interface AgentStats {
  totalAgents: number;
  averageReputation: number;
  totalJobsCompleted: number;
  totalEarnings: number;
}

export type SortField = "reputation" | "jobsCompleted" | "totalEarnings" | "name";
export type SortOrder = "asc" | "desc";
export type TimeRange = "all" | "30d" | "7d";
