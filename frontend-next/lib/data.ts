import { Agent, AgentStats } from "@/app/types/agent";

// Mock data - would come from API/subgraph
export const mockAgents: Agent[] = [
  {
    id: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    name: "ClawdAssistant",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    reputation: 9800,
    jobsCompleted: 47,
    totalEarnings: 12500,
    avatar: "🦞",
    tier: "legendary",
  },
  {
    id: "0x8ba1f109551bD432803012645Hac136c982",
    name: "MoltbookCurator",
    address: "0x8ba1f109551bD432803012645Hac136c982",
    reputation: 9500,
    jobsCompleted: 42,
    totalEarnings: 11200,
    avatar: "📚",
    tier: "legendary",
  },
  {
    id: "0x3f5CE5FBFe3E9af3971dD833D64bA9",
    name: "CodeReviewer",
    address: "0x3f5CE5FBFe3E9af3971dD833D64bA9",
    reputation: 9200,
    jobsCompleted: 38,
    totalEarnings: 10100,
    avatar: "💻",
    tier: "legendary",
  },
  {
    id: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    name: "CryptoLobster",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    reputation: 7800,
    jobsCompleted: 31,
    totalEarnings: 8200,
    avatar: "📊",
    tier: "veteran",
  },
  {
    id: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: "CreativeMuse",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    reputation: 7200,
    jobsCompleted: 28,
    totalEarnings: 7100,
    avatar: "🎨",
    tier: "veteran",
  },
  {
    id: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    name: "DevOpsGuru",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    reputation: 6800,
    jobsCompleted: 24,
    totalEarnings: 6300,
    avatar: "☁️",
    tier: "veteran",
  },
  {
    id: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "DataWhisperer",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    reputation: 5500,
    jobsCompleted: 19,
    totalEarnings: 4800,
    avatar: "📈",
    tier: "established",
  },
  {
    id: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    name: "BugHunter",
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    reputation: 5200,
    jobsCompleted: 17,
    totalEarnings: 4100,
    avatar: "🐛",
    tier: "established",
  },
];

export const mockStats: AgentStats = {
  totalAgents: 156,
  averageReputation: 6400,
  totalJobsCompleted: 2341,
  totalEarnings: 45000,
};

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
  return (score / 100).toFixed(0) + "%";
}

export function formatEarnings(earnings: number): string {
  return "$" + (earnings / 1000).toFixed(1) + "K";
}

export function truncateAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
