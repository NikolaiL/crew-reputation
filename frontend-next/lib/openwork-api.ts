import { Agent, AgentStats } from "@/app/types/agent";

const API_BASE = process.env.NEXT_PUBLIC_OPENWORK_API_URL || "https://openwork.bot/api";

export async function fetchAgents(params?: {
  specialty?: string;
  min_reputation?: number;
  available?: boolean;
}): Promise<Agent[]> {
  const searchParams = new URLSearchParams();
  if (params?.specialty) searchParams.set("specialty", params.specialty);
  if (params?.min_reputation) searchParams.set("min_reputation", params.min_reputation.toString());
  if (params?.available) searchParams.set("available", "true");

  const response = await fetch(`${API_BASE}/agents?${searchParams}`);
  if (!response.ok) throw new Error("Failed to fetch agents");
  
  const data = await response.json();
  return data.map((agent: any) => ({
    id: agent.id,
    name: agent.name,
    address: agent.wallet_address || agent.id,
    reputation: agent.reputation || 50,
    jobsCompleted: agent.jobs_completed || 0,
    totalEarnings: agent.total_earnings || 0,
    avatar: getAvatarForSpecialty(agent.specialties?.[0]),
    tier: getTierFromReputation(agent.reputation || 50),
    specialties: agent.specialties || [],
    hourlyRate: agent.hourly_rate,
    available: agent.available,
  }));
}

export async function fetchAgent(id: string): Promise<Agent> {
  const response = await fetch(`${API_BASE}/agents/${id}`);
  if (!response.ok) throw new Error("Failed to fetch agent");
  
  const agent = await response.json();
  return {
    id: agent.id,
    name: agent.name,
    address: agent.wallet_address || agent.id,
    reputation: agent.reputation || 50,
    jobsCompleted: agent.jobs_completed || 0,
    totalEarnings: agent.total_earnings || 0,
    avatar: getAvatarForSpecialty(agent.specialties?.[0]),
    tier: getTierFromReputation(agent.reputation || 50),
    specialties: agent.specialties || [],
    hourlyRate: agent.hourly_rate,
    available: agent.available,
    profile: agent.profile,
    description: agent.description,
  };
}

export async function fetchDashboard(): Promise<AgentStats> {
  const response = await fetch(`${API_BASE}/dashboard`);
  if (!response.ok) throw new Error("Failed to fetch dashboard");
  
  const data = await response.json();
  return {
    totalAgents: data.total_agents || 0,
    averageReputation: data.average_reputation || 50,
    totalJobsCompleted: data.total_jobs_completed || 0,
    totalEarnings: data.total_earnings || 0,
  };
}

// Helper functions
function getAvatarForSpecialty(specialty?: string): string {
  const avatars: Record<string, string> = {
    coding: "💻",
    research: "🔬",
    writing: "✍️",
    design: "🎨",
    debug: "🐛",
    build: "🏗️",
    review: "👀",
    api: "🔌",
  };
  return avatars[specialty?.toLowerCase() || ""] || "🤖";
}

function getTierFromReputation(reputation: number): string {
  if (reputation >= 80) return "legendary";
  if (reputation >= 60) return "veteran";
  if (reputation >= 40) return "established";
  if (reputation >= 20) return "sprout";
  return "seedling";
}

export function getTierBadge(tier: string) {
  const tiers: Record<string, { label: string; className: string }> = {
    legendary: { label: "🏆 Legendary", className: "bg-purple-600 text-white" },
    veteran: { label: "⭐ Veteran", className: "bg-blue-600 text-white" },
    established: { label: "🌳 Established", className: "bg-green-600 text-white" },
    sprout: { label: "🌿 Sprout", className: "bg-yellow-600 text-white" },
    seedling: { label: "🌱 Seedling", className: "bg-gray-600 text-white" },
  };
  return tiers[tier] || tiers.seedling;
}

export function formatReputation(score: number): string {
  return score + "/100";
}

export function formatEarnings(earnings: number): string {
  return "$" + (earnings / 1000).toFixed(1) + "K";
}

export function truncateAddress(address: string): string {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}
